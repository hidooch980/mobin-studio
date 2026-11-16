import os, json, base64
os.chdir(os.path.dirname(os.path.abspath(__file__)))
R=lambda p:open(p,encoding='utf-8').read()
B64=lambda p:base64.b64encode(open(p,'rb').read()).decode()
L='assets/letter/'
# high-quality lettering fonts (SIL OFL). Vazirmatn reuses the UI @font-face data (no duplicate bytes).
letter=[
  {'k':'وزیرمتن','css':'Vazirmatn','faces':[[400,None],[700,None]]},
  {'k':'ساحل','css':'Sahel','faces':[[400,None],[700,None]]},
  {'k':'شبنم','faces':[[400,B64(L+'Shabnam-Regular.woff2')],[700,B64(L+'Shabnam-Bold.woff2')]]},
  {'k':'استعداد','css':'Estedad','faces':[[400,None],[700,None]]},
  {'k':'لاله‌زار','bold':1,'faces':[[400,B64(L+'Lalezar-Regular.woff2')]]},
]
js='\n'.join(R(f).rstrip('\n') for f in ('builtin-fonts.js','android-bridge.js','app.js','extras.js','ai.js','mobile.js','update.js'))+'\n'
PH='/*@@LETTERFONTS@@*/[]'
assert js.count(PH)==1, 'placeholder missing'
js=js.replace(PH, json.dumps(letter,ensure_ascii=False,separators=(',',':')))
meta = '<meta name="ms-version" content="' + json.loads(R('package.json'))['version'] + '">'
assert R('head.html').count('</head>')==1 and meta not in R('head.html')
out = R('head.html').replace('</head>', meta + '</head>') + '<style>' + R('app.css') + '</style>' + R('mid.html') + '<body class="noPages">' + R('app.body.html') + '<script>' + js + '</script>' + R('tail.html')
open('build/index.html','w',encoding='utf-8').write(out)
print('built', os.path.getsize('build/index.html'))
