import logging
import requests, json
from PN532 import PN532
global idUser

logging.basicConfig(level=logging.DEBUG)
def callbackPN532(tag, id):
    print('Found tag: {}, id: {}'.format(tag, id))

def main():

    #NFC modulua hasieratu
    pn532 = PN532('tty:S0',"F0010203040506",callbackPN532)
    
    #NFC identifikazioa itxaroten
    pn532.listen()
    id = int(pn532.device_uid[:-4])
    pn532.close()  
 
    #Datuak JSON bihurtu
    data = {
        "idUser": id
    }
    json_data = json.dumps(data)


    # REST POST
    response = requests.post("http://192.168.137.1:3000/raspberry/check", data=json_data, headers ={"Content-Type": "application/json"})
    erantzuna = json.loads(response.text)
    print(erantzuna)
    if erantzuna["baimena"] == "baimenduta":
        
        print("Erabiltzailea baimenduta dago")
        
        if erantzuna["ekintza"] == "ireki":
            ireki()
        elif erantzuna["ekintza"] == "itxi":
            itxi()
        else :
            print("Ekintza ez da zuzena")

    elif erantzuna["baimena"] == "ezbaimenduta":
        print("Erabiltzailea ez dago baimenduta kutxatila irekitzeko")
    else :
        print("Baimena ez da zuzena")




        
def ireki():
    ireki=1
    print("Kutxatila irekiko da")

def itxi():
    itxi=1
    print("Kutxatila itxiko da")

if __name__ == '__main__':
    main()   






 


