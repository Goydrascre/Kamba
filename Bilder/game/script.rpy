# Declare characters used by this game. The color argument colorizes the
# name of the character.
default sannhet = 0
image bg bk = "bk.png"  # Background image declaration
image bg sykehus = "sykehus.jpeg"
define K = Character("Konrad", color="#ffcc00")  # Konrad med gul farge.
define M = Character("???", color="#941212")
define S = Character("Meur", color="#2c91b9")
define Sy = Character("Sykepleier", color="2c91b9") 
define Ma = Character("Mats", color="2c91b9") 
define L = Character("Lucas", color="800080") 
transform zoomed:
    zoom 1.5
image ki = "ki.png" 
image evil = "evil.png" 
image sykepleier = "sykepleier.png" 
image mats_sur = "mats_sur.png" 
image bg klasseroom:
    "klasseroom.jpg"
    zoom 0.5
# The game starts here. 
label start:


    scene bg bk:   # Ensure background image is loaded with fade transition
        zoom 1.1  # Adjust zoom level if needed
        
    show evil at zoomed, center

    S "kjønner ikke at du klarer å spise her, ???"

    M "Burger king er jo kjempe godt"
    M "nam nam nam"

    S "sikkert.."

    $ renpy.pause(1) 

    S "uffameg denne drikken må ha blitt dårlig. jeg henter en ny en"

    M "Nei ikke gjør det, da emmm.. sløser du drikke, og det er ikke bra"

    S "Når begynte du å bry deg om sånt?"

    M "Siden alltid, bare fortsett å drikk, den smaker bare dårlig siden du er i så dårlig humør."

    S "sluuuuuuurp, nei æsj jeg henter en ny"

    M "(søren ta)"
    scene bg bk:
        zoom 1.1
        blur 16

    S "(ugh, jeg kommer til å kaste opp)"

    $ renpy.pause(1.5)

    S "Hodet mitt... det snurrer..."


    $ renpy.pause(1)

    S "Hva... hva skjer med meg?"

    S "Jeg... jeg kan ikke..."
    scene bg bk:
        zoom 1.1
        blur 16

    $ renpy.pause(2)

    S "...Se...noe..."

    $ renpy.pause(1)

    S "Ugh..."

    $ renpy.pause(1.5)


    $ renpy.pause(0.5)

    "Meur vakler bakover, beina gir etter, og han faller tungt mot bakken."
    "Alt blir svart."

    scene black with fade

    $ renpy.pause(2)

    "En fjern stemme høres i mørket..."

    M "hi hi hi ha 😈."

    scene bg sykehus with Dissolve(5.0)

    S "(Hodet mitt dunker... Hva skjedde?)"

    show sykepleier at zoomed, right with dissolve

    Sy "Du besvimte på Burger King. De ringte ambulansen, og nå er du her."

    S "Sykehuset...? Hvor lenge har jeg vært her?"

    Sy "Bare en halv time. Det ser ut til at du har blitt forgiftet, hvis du hadde komt litt senere så hadde det vært vanskelig å redde deg."

    S "(Den forbanna drikken...)"

    S "Kan jeg få vile her litt til?"

    Sy "Så klart"

    S "Får jeg legeerklæring?"

    Sy "Nei"

    S "..."

    Sy "..."

    S "Jeg tror jeg drar tilbake til skolen nå"

    Sy "God bedring"

    "Meur reiser seg forsiktig fra sykehussengen, strekker seg og tar noen dype pust før han forlater rommet."

    scene black with fade

    scene bg klasseroom with Dissolve(2.0)

    "klasserommet er nesten tomt, bare tre elever er igjen."

    show kg at zoomed, left with moveinleft
    show mats_sur at zoomed, center with moveinbottom
    show lucas_idle at zoomed, right with moveinright

    Ma "Oi!, hvor ble du av?"
    hide kg
    show ki at zoomed, left
    K "heh heh heh, dårlig mat?"
    hide lucas_idle
    show lucas_trist at zoomed, right 
    L "Jeg var så beskymrett for deg"
    hide lucas_trist
    show lucas_sint at zoomed, right
    L "aldri skrem meg sånn igjen!"

    K "hva var det som skjedde da?"

    S "(burde jeg fortelle sannheten?)"
menu:
    "Noen forgiftet drikken min":
        $ sannhet = 1
        hide lucas_sint
        show lucas_idle at zoomed, right
        hide ki
        show ks at zoomed, left
        K "oi oi oi, det er skummle saker"
        hide mats_sur
        show mats_idle at zoomed, center
        Ma "sikkert...Tror ikke på deg et sekund"
        hide lucas_idle
        show lucas_sint at zoomed, right
        L "kutt ut Mats, Meur ville aldri løyet til meg sånn"
        hide lucas_sint
        show lucas_glad at zoomed, right
        L "ikke vær redd! Jeg skal finne ut hvem som gjorde det!"
        hide lucas_glad with moveoutright
        hide ks
        show kt at zoomed, left
        K "jeg går og sitter for megselv :()"
        hide kt with moveoutright
        hide mats_idle
        show mats_glad at zoomed, center
        M "jeg går og sover "
        hide mats_glad with moveoutleft

        jump hvem

    "Jeg vet ikke..... ble bare svimmel":
        $ sannhet = 0
        K "mhmmm"
        hide ki
        show kt at zoomed, left
        K "du trenger ikke si sannheten hvis du ikke vil"
        hide lucas_idle
        show lucas_sint at zoomed, right
        L "hva er det du snakker om Konrad?"
        hide kt 
        show ki at zoomed, left
        K "Ingenting..."
        hide ki with moveoutleft
        hide lucas_sint
        show lucas_idle at zoomed, right
        L "for en merkelig kar"
        hide lucas_idle
        show lucas_glad at zoomed, right
        L "hvis du føler deg bedre nå så er det alt som tells"
        hide lucas_glad with moveoutright
        Ma "aja"
        hide mats_sur 
        show mats_glad at zoomed, center
        Ma "god bedring"
        hide mats_glad with moveoutleft

        jump hvem

        label hvem:
            S "hvem skal jeg snakke med?"
            menu:
                "Mats":
                    Ma "ZZZZZzzzzzzzzzz"
                    S "Mats?"
                    Ma "snork snork snork"
                    S "Mats!"
                    show mats_sur at zoomed, center with moveinbottom
                    Ma "Ååå!"  
                    if sannhet == 1:
                        Ma "hva er det du vil, løynhals"
                        jump mats
                    else:
                        Ma "hva er det du vil?"
                        jump mats
                    return

                "Konrad":
                    jump konrad
                "Lucas":
                    jump lucas

        label mats:
            menu:
                "du forgiftet meg":
                    Ma "nei"
                "hvem gikk jeg til burgerking med?":
                    Ma "nei"
                "bare glem det":
                    Ma "aldri snakk med meg igjen"
                    hide mats_sur with moveoutleft
                    jump hvem

        label konrad:
            K "Jeg tenker på rare ting."
            return

        label lucas:
            L "Jeg er alltid glad, uansett hva!"
            return



        





    



