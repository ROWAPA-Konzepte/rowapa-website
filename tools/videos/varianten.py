# ROWAPA Startseite · Filmschleifen für die drei Wege-Karten
# Jede Variante ist hier festgehalten und lässt sich jederzeit neu erzeugen:
#   python3 tools/videos/varianten.py privat-v4        -> eine Variante rechnen
#   python3 tools/videos/varianten.py alle             -> alle Varianten rechnen
#   python3 tools/videos/varianten.py aktiv            -> die aktiven Varianten nach assets/video/ kopieren
# Quelle: Ordner «Videos» in «Claude und Webflow Daten» (eigene Seminarfilme von ROWAPA).
# Format: Hochformat wie das Kartenbild (4:4.4), CI-Duoton eingebrannt, ohne Ton, nahtlose Schleife.
import subprocess, sys, os, shutil
V = os.environ.get('RW_VIDEOS', '/mnt/user-data/uploads/Claude und Webflow Daten/Videos/')
HERE = os.path.dirname(os.path.abspath(__file__)); REPO = os.path.dirname(os.path.dirname(HERE))
OUT = os.environ.get('RW_OUT', os.path.join(HERE, 'out')); os.makedirs(OUT, exist_ok=True)
W, H = 640, 704; CW = round(1080 * W / H)
LO, MID, HI = (0x1D,0x31,0x49), (0x85,0x9D,0xBE), (0xEA,0xF2,0xF8)   # wie Filter #rw-duo im Code
def lut(k): return f"if(lt(val\\,128)\\,{LO[k]}+({MID[k]}-{LO[k]})*val/127.5\\,{MID[k]}+({HI[k]}-{MID[k]})*(val-127.5)/127.5)"
DUO = ("colorchannelmixer=.2126:.7152:.0722:0:.2126:.7152:.0722:0:.2126:.7152:.0722:0,"
       f"lutrgb=r='{lut(0)}':g='{lut(1)}':b='{lut(2)}',eq=contrast=1.04")
TR  = 'persönlichkeitsentwicklung_trailer.mp4_v1 (1080p).mp4'
WWS = 'rowapa__wer_wir_sind__v1 (1080p).mp4'
FUE = 'rowapa_führungstraining_final_v1 (1080p).mp4'
ST  = 'headervideo_startseite_v1 (1080p).mp4'
SA  = 'headervideo_sales_v1 (1080p).mp4'
LE  = 'headervideo_leadership_v1 (1080p).mp4'
FB  = 'feedback___cas_professional_leadership_for_finance_v1 (1080p).mp4'
GW  = ',eq=contrast=1.2:brightness=-0.035:gamma=0.97'      # flaches Material aus «Wer wir sind»
GT  = ',eq=contrast=1.12:gamma=0.98'                     # Trailer
GF  = ',eq=contrast=1.06:gamma=1.14:brightness=0.015'       # dunkles Material aus dem CAS-Feedbackfilm
# Einstellung: (Datei, von s, bis s, Ausschnitt x, Nachbearbeitung)
VARIANTEN = {
 'privat-v1': dict(xf=.6, shots=[(TR,0.2,6.7,560,'')], info='Junger Berater im Kundengespräch'),
 'privat-v2': dict(xf=.6, shots=[(WWS,9.78,12.15,700,GW),(WWS,26.15,27.97,700,GW),(WWS,7.32,9.7,60,GW),(WWS,14.75,17.1,560,GW)], info='Austausch am Seminartisch, kühles Licht'),
 'privat-v3': dict(xf=.6, shots=[(FB,0.05,3.0,0,GF),(FB,46.72,48.55,380,GF),(FB,48.66,50.1,380,GF),(FB,14.62,17.75,380,GF)], info='Gemischte Runde am Tisch, warmes Licht'),
 'privat-v4': dict(xf=.4, crf=3, shots=[(FUE,28.02,29.14,60,''),(FB,46.72,48.55,380,GF),(FUE,56.86,57.9,330,''),(FUE,29.18,30.26,250,''),(FB,48.66,50.1,380,GF),(FUE,79.9,81.06,500,''),(FB,0.3,2.2,0,GF),(FUE,26.86,27.98,330,'')], info='Lachende, fröhliche Menschen'),
 'privat-v5': dict(xf=.4, crf=3, shots=[(FUE,28.02,29.14,60,''),(FB,46.72,48.55,380,GF),(FUE,56.86,57.9,330,''),(FUE,29.18,30.26,250,''),(FB,48.66,50.1,380,GF),(FUE,79.9,81.06,500,''),(FUE,26.86,27.98,330,'')], info='Wie v4, ohne die Teilnehmerin allein am Tisch'),
 'broker-v1': dict(xf=.6, shots=[(WWS,46.3,52.15,430,'')], info='Trainer im Raum mit orangem Licht'),
 'broker-v2': dict(xf=.6, shots=[(FUE,38.72,40.97,170,''),(FUE,44.2,46.45,380,''),(FUE,62.62,65.3,470,'')], info='Teilnehmer am Tisch und Statement, Führungstraining'),
 'broker-v3': dict(xf=.4, crf=3, shots=[(FUE,30.3,31.34,420,''),(FUE,25.7,26.82,560,''),(FUE,32.46,33.7,700,''),(FUE,48.82,49.94,500,''),(FUE,49.98,51.1,620,''),(FUE,69.58,70.74,450,''),(FUE,74.18,75.3,420,'')], info='Trainer im blauen Anzug, Führungstraining'),
 'broker-v4': dict(xf=.6, shots=[(WWS,61.6,65.0,800,GW),(WWS,77.9,81.2,280,GW),(WWS,52.4,55.4,470,GW)], info='Trainer im blauen Anzug, heller Seminarraum (Wer wir sind)'),
 'broker-v5': dict(xf=.6, crf=5, shots=[(ST,20.0,22.7,760,''),(ST,24.5,26.9,470,''),(SA,25.6,28.3,280,''),(LE,8.3,11.0,700,'')], info='Training in Aktion: Übung an der Flipchart, Austausch im Stehen, Coaching am Tisch, Trainer an der Flipchart'),
 'broker-v6': dict(xf=.6, shots=[(TR,13.0,15.8,380,GT),(TR,18.2,20.9,420,GT),(TR,23.0,25.6,650,GT),(TR,38.2,40.9,700,GT)], info='Berater bei der Arbeit: Kundentermin zu Hause, Gespräch am Tisch, Telefonberatung (Trailer)'),
 'broker-v7': dict(xf=.4, crf=3, shots=[(FUE,32.46,33.7,700,''),(WWS,61.8,63.8,800,GW),(FB,7.45,8.9,200,GF),(FUE,49.98,51.1,620,''),(LE,8.4,10.4,560,'')], info='Trainingssequenzen mit verschiedenen Trainern'),
 'broker-v8': dict(xf=.4, crf=6, shots=[(FUE,18.7,19.95,60,''),(FUE,61.38,62.54,700,''),(FUE,20.0,22.7,470,''),(WWS,77.9,80.4,420,GW),(LE,8.4,10.4,560,'')], info='Fröhliche Trainingsmomente mit verschiedenen Trainern, ohne den Trainer im grauen Sakko'),
 'female-v1': dict(xf=.6, shots=[(WWS,29.95,32.8,170,''),(WWS,36.9,39.65,330,''),(FUE,12.0,14.9,470,'')], info='Teilnehmerin nachdenklich, Frau im Gespräch, Jennifer Boek'),
 'female-v2': dict(xf=.6, shots=[(FUE,14.6,17.3,470,''),(FUE,22.76,24.9,380,''),(WWS,36.9,39.65,330,GW)], info='Jennifer Boek, Frau im Gespräch'),
}
AKTIV_LOOK = 'natur'   # Bildlook auf der Seite (data-foto), Entscheid 23.10.2026
AKTIV = {'privat': 'privat-v5', 'broker': 'broker-v8', 'female': 'female-v1'}

LOOK = os.environ.get('RW_LOOK', 'duo')          # duo | weich | natur (wie die Foto-Filter im Code)
LOOKS = {'weich': (.6, .62, .38), 'natur': (.72, .22, .78)}   # Sättigung Original, Anteil Duoton, Anteil Original
def rechne(key):
    v = VARIANTEN[key]; shots = v['shots']; XF = v.get('xf', .6); cb = v.get('crf', 0)
    ins, fg = [], []
    for i, (f, a, b, x, g) in enumerate(shots):
        ins += ['-ss', str(a), '-t', str(b - a), '-i', V + f]
        base_ = f"[{i}:v]fps=25,crop={CW}:1080:{x}:0,scale={W}:{H}:flags=lanczos,setsar=1{g},format=rgb24"
        if LOOK in LOOKS:
            sat, kd, ko = LOOKS[LOOK]
            fg.append(f"{base_},split[a{i}][b{i}];[a{i}]{DUO},format=gbrp[d{i}];[b{i}]hue=s={sat},format=gbrp[o{i}];[d{i}][o{i}]blend=all_expr='A*{kd}+B*{ko}',format=yuv420p,settb=1/25,setpts=PTS-STARTPTS[s{i}]")
        else:
            fg.append(f"{base_},{DUO},format=yuv420p,settb=1/25,setpts=PTS-STARTPTS[s{i}]")
    cur = 's0'; L = shots[0][2] - shots[0][1]
    for i in range(1, len(shots)):
        fg.append(f"[{cur}][s{i}]xfade=transition=fade:duration={XF}:offset={L-XF:.3f}[c{i}]"); cur = f'c{i}'; L += shots[i][2] - shots[i][1] - XF
    fg.append(f"[{cur}]split[m][n];[n]trim=0:{XF},setpts=PTS-STARTPTS[h];[m][h]xfade=transition=fade:duration={XF}:offset={L-XF:.3f},trim=start={XF},setpts=PTS-STARTPTS[o]")
    base = ['ffmpeg', '-v', 'error', '-y', *ins, '-filter_complex', ';'.join(fg), '-map', '[o]', '-an']
    o = os.path.join(OUT, key + ('' if LOOK == 'duo' else '-' + LOOK))
    subprocess.run(base + ['-c:v','libx264','-preset','slow','-crf',str(28+cb),'-profile:v','high','-pix_fmt','yuv420p','-movflags','+faststart', o+'.mp4'], check=True)
    for extra in (0, 4, 8):   # WebM soll kleiner sein als MP4, sonst stärker komprimieren
        subprocess.run(base + ['-c:v','libvpx-vp9','-b:v','0','-crf',str(40+cb+extra),'-row-mt','1','-deadline','good','-cpu-used','2', o+'.webm'], check=True)
        if os.path.getsize(o+'.webm') < os.path.getsize(o+'.mp4') * .95: break
    print(key, round(L - XF, 2), 's', os.path.getsize(o+'.webm')//1024, 'KB webm')

def aktiv():
    for k, key in AKTIV.items():
        for ext in ('mp4', 'webm'):
            shutil.copy(os.path.join(OUT, f'{key}{"" if AKTIV_LOOK == "duo" else "-" + AKTIV_LOOK}.{ext}'), os.path.join(REPO, 'assets/video', f'rw-weg-{k}.{ext}'))
        print(k, '<-', key)

if __name__ == '__main__':
    arg = sys.argv[1:] or ['aktiv']
    if arg == ['alle']: [rechne(k) for k in VARIANTEN]
    elif arg == ['aktiv']: aktiv()
    else: [rechne(k) for k in arg]
