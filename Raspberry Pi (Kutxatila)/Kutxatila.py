import requests, time


def main():

    #Ordu bakoitzeko erreserbak lortu
    while True:
        response = requests.get("ErreserbakLortuURL")
        ordukoErreserbak = response.json()

        #Erreserbak badaude, atera begizta infinitutik
        if len(ordukoErreserbak) != 0:
            print("Ez daude erreserbak ordu honetarako\n")
            break
        #Hurrengo ordura arte itxaron
        time.sleep(3600)
    
    #NFC identifikazioa itxaroten
    id = 1
    #Identifikazioa jaso da, JSON bihurtu 

    # REST POST
    response = requests.get("IdentifikazioaBidaliURL",json=id)
    if response.baimena == "baimenduta":
        
        print("Erabiltzailea baimenduta dago")
        
        if response.ekintza == "ireki":
            ireki()
        elif response.ekintza == "itxi":
            itxi()
        else :
            print("Ekintza ez da zuzena")

    elif response == "ezbaimenduta":
        print("Erabiltzailea ez dago baimenduta kutxatila irekitzeko")
    else :
        print("Baimena ez da zuzena")





    
        
def ireki():
    ireki=1

def itxi():
    itxi=1

if __name__ == '__main__':
    main()   


