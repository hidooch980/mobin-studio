Unicode true
!include "MUI2.nsh"
!include "FileFunc.nsh"
!include "LogicLib.nsh"

!define APPNAME       "Mobin Studio"
!define APPFOLDER     "Mobin Studio"
!define APPEXE        "MobinStudio.exe"
!define APPVER        "8.5.1"
!define APPPUB        "Mobin Studio"
!define REGKEY        "Software\Microsoft\Windows\CurrentVersion\Uninstall\MobinStudio"
!define APPREG        "Software\MobinStudio"

Name "${APPNAME}"
Caption "نصب ${APPNAME} ${APPVER}"
UninstallCaption "حذف ${APPNAME}"
OutFile "..\..\dist\MobinStudio-Setup-${APPVER}.exe"
InstallDir "$LOCALAPPDATA\Programs\${APPFOLDER}"
InstallDirRegKey HKCU "${APPREG}" "InstallDir"
RequestExecutionLevel user
SetCompressor /SOLID lzma
SetCompressorDictSize 64
BrandingText "${APPNAME} ${APPVER}"
ShowInstDetails hide
ShowUnInstDetails hide
ManifestDPIAware true
AllowSkipFiles off

VIProductVersion "8.5.1.0"
VIAddVersionKey /LANG=1065 "ProductName"     "${APPNAME}"
VIAddVersionKey /LANG=1065 "CompanyName"     "${APPPUB}"
VIAddVersionKey /LANG=1065 "FileDescription" "${APPNAME} Setup"
VIAddVersionKey /LANG=1065 "FileVersion"     "${APPVER}"
VIAddVersionKey /LANG=1065 "ProductVersion"  "${APPVER}"
VIAddVersionKey /LANG=1065 "LegalCopyright"  "Copyright (C) 2025 ${APPPUB}"

!define MUI_ICON   "..\build\icon.ico"
!define MUI_UNICON "..\build\icon.ico"
!define MUI_WELCOMEFINISHPAGE_BITMAP   "..\build\welcome.bmp"
!define MUI_ABORTWARNING
!define MUI_ABORTWARNING_TEXT "نصب ${APPNAME} نیمه‌کاره بماند و بسته شود؟"
!define MUI_WELCOMEPAGE_TITLE "به نصب ${APPNAME} خوش آمدید"
!define MUI_WELCOMEPAGE_TEXT "این برنامه «${APPNAME}» نسخهٔ ${APPVER} را روی کامپیوتر شما نصب می‌کند.$\r$\n$\r$\nبرنامه کاملاً آفلاین کار می‌کند، به اینترنت نیازی ندارد و برای نصب، دسترسی مدیر (Administrator) لازم نیست.$\r$\n$\r$\nاگر نسخهٔ قبلی نصب است، به‌روز می‌شود و پروژه‌ها و تنظیمات شما سر جایشان می‌مانند.$\r$\n$\r$\nبرای ادامه «بعدی» را بزنید."
!define MUI_DIRECTORYPAGE_TEXT_TOP "برنامه در پوشهٔ زیر نصب می‌شود. برای انتخاب پوشهٔ دیگر «مرور» را بزنید."
!define MUI_FINISHPAGE_TITLE "نصب تمام شد"
!define MUI_FINISHPAGE_TEXT "${APPNAME} با موفقیت نصب شد.$\r$\n$\r$\nمیان‌بر برنامه روی دسکتاپ و در منوی استارت ساخته شد."
!define MUI_FINISHPAGE_RUN "$INSTDIR\${APPEXE}"
!define MUI_FINISHPAGE_RUN_TEXT "همین حالا ${APPNAME} را باز کن"
!define MUI_UNCONFIRMPAGE_TEXT_TOP "${APPNAME} از کامپیوتر شما حذف می‌شود. پروژه‌ها و عکس‌هایی که خودتان ذخیره کرده‌اید پاک نمی‌شوند."

!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "Farsi"

; an open copy must be closed first (it may hold unsaved work, so it is never killed without asking)
!macro CLOSE_RUNNING UN
Function ${UN}CloseRunning
  check:
    nsExec::ExecToStack '"$SYSDIR\cmd.exe" /c ""$SYSDIR\tasklist.exe" /FI "IMAGENAME eq ${APPEXE}" /NH | "$SYSDIR\find.exe" /I "${APPEXE}""'
    Pop $0
    Pop $1
    StrCmp $0 "0" 0 done
    ; an update started from inside the app runs silent (/S): the app has
    ; already asked to restart, so just close it instead of showing a prompt
    ; that nobody is there to answer.
    ${If} ${Silent}
      Goto force
    ${EndIf}
    MessageBox MB_RETRYCANCEL|MB_ICONEXCLAMATION "${APPNAME} الان باز است.$\r$\n$\r$\nاگر کار ذخیره‌نشده دارید، اول آن را ذخیره کنید، بعد برنامه را ببندید و «Retry» را بزنید." /SD IDCANCEL IDRETRY check
    MessageBox MB_YESNO|MB_ICONQUESTION|MB_DEFBUTTON2 "${APPNAME} به‌اجبار بسته شود؟$\r$\n$\r$\nکار ذخیره‌نشده از بین می‌رود." /SD IDYES IDYES force
    Abort
  force:
    nsExec::Exec '"$SYSDIR\taskkill.exe" /IM "${APPEXE}" /F'
    Pop $0
    Sleep 1200
  done:
FunctionEnd
!macroend
!insertmacro CLOSE_RUNNING ""
!insertmacro CLOSE_RUNNING "un."

Function .onInit
  Call CloseRunning
  ; if a copy is already installed, update it in the same folder
  ReadRegStr $0 HKCU "${APPREG}" "InstallDir"
  ${If} $0 != ""
    StrCpy $INSTDIR $0
  ${EndIf}
FunctionEnd

Function un.onInit
  Call un.CloseRunning
FunctionEnd

Section "Install"
  SetOutPath "$INSTDIR"
  SetOverwrite on

  ; remove files of a previous version so nothing stale is left behind
  RMDir /r "$INSTDIR\locales"
  RMDir /r "$INSTDIR\resources"

  File /r "payload\*.*"

  WriteRegStr HKCU "${APPREG}" "InstallDir" "$INSTDIR"

  ; project files (.mobin) open with a double-click, with their own icon
  WriteRegStr HKCU "Software\Classes\.mobin" "" "MobinStudio.Project"
  WriteRegStr HKCU "Software\Classes\.mobin" "Content Type" "application/x-mobin"
  WriteRegStr HKCU "Software\Classes\MobinStudio.Project" "" "پروژهٔ Mobin Studio"
  WriteRegStr HKCU "Software\Classes\MobinStudio.Project\DefaultIcon" "" "$INSTDIR\mobin-doc.ico"
  WriteRegStr HKCU "Software\Classes\MobinStudio.Project\shell\open\command" "" '"$INSTDIR\${APPEXE}" "%1"'
  System::Call 'shell32::SHChangeNotify(i 0x08000000, i 0, p 0, p 0)'
  WriteRegStr HKCU "${APPREG}" "Version"    "${APPVER}"

  CreateShortCut "$DESKTOP\${APPNAME}.lnk"  "$INSTDIR\${APPEXE}" "" "$INSTDIR\${APPEXE}" 0
  CreateDirectory "$SMPROGRAMS"
  CreateShortCut "$SMPROGRAMS\${APPNAME}.lnk" "$INSTDIR\${APPEXE}" "" "$INSTDIR\${APPEXE}" 0

  WriteUninstaller "$INSTDIR\Uninstall.exe"

  ${GetSize} "$INSTDIR" "/S=0K" $0 $1 $2
  WriteRegStr   HKCU "${REGKEY}" "DisplayName"     "${APPNAME}"
  WriteRegStr   HKCU "${REGKEY}" "DisplayVersion"  "${APPVER}"
  WriteRegStr   HKCU "${REGKEY}" "Publisher"       "${APPPUB}"
  WriteRegStr   HKCU "${REGKEY}" "DisplayIcon"     "$INSTDIR\${APPEXE}"
  WriteRegStr   HKCU "${REGKEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr   HKCU "${REGKEY}" "UninstallString" '"$INSTDIR\Uninstall.exe"'
  WriteRegStr   HKCU "${REGKEY}" "QuietUninstallString" '"$INSTDIR\Uninstall.exe" /S'
  WriteRegDWORD HKCU "${REGKEY}" "NoModify" 1
  WriteRegDWORD HKCU "${REGKEY}" "NoRepair" 1
  WriteRegDWORD HKCU "${REGKEY}" "EstimatedSize" "$0"
SectionEnd

Section "Uninstall"
  Delete "$DESKTOP\${APPNAME}.lnk"
  Delete "$SMPROGRAMS\${APPNAME}.lnk"
  RMDir /r "$INSTDIR\locales"
  RMDir /r "$INSTDIR\resources"
  Delete "$INSTDIR\*.dll"
  Delete "$INSTDIR\*.pak"
  Delete "$INSTDIR\*.bin"
  Delete "$INSTDIR\*.dat"
  Delete "$INSTDIR\*.json"
  Delete "$INSTDIR\FONT-LICENSES.txt"
  Delete "$INSTDIR\LICENSE"
  Delete "$INSTDIR\version"
  Delete "$INSTDIR\${APPEXE}"
  Delete "$INSTDIR\mobin-doc.ico"
  Delete "$INSTDIR\Uninstall.exe"
  RMDir "$INSTDIR"
  DeleteRegKey HKCU "${REGKEY}"
  DeleteRegKey HKCU "${APPREG}"
  ; file type: only remove .mobin if it still points to us
  DeleteRegKey HKCU "Software\Classes\MobinStudio.Project"
  ReadRegStr $0 HKCU "Software\Classes\.mobin" ""
  ${If} $0 == "MobinStudio.Project"
    DeleteRegKey HKCU "Software\Classes\.mobin"
  ${EndIf}
  System::Call 'shell32::SHChangeNotify(i 0x08000000, i 0, p 0, p 0)'
SectionEnd
