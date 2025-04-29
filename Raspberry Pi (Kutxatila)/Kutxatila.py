import logging, requests, json, time
import RPi.GPIO as GPIO
from PN532 import PN532

logging.basicConfig(level=logging.DEBUG)
 


def callbackPN532(tag, id):
    print('Found tag: {}, id: {}'.format(tag, id))

def main():
    URL = "http://192.168.137.1:3000/raspberry"
    #Mugikorraren aplikazioa NFC eskaera jaso dezan erabili behar den id-a
    AID = "F0010203040506"
    LED_PIN = 22
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(LED_PIN, GPIO.OUT)  
    GPIO.output(LED_PIN, GPIO.LOW)
    #NFC modulua hasieratu
    pn532 = PN532('tty:S0',AID, callbackPN532)
    
    #NFC identifikazioa itxaroten
    pn532.listen()
    
    if len(pn532.device_uid) > 4 and pn532.device_uid[-4:] == "9000" :
        codepoint = int(pn532.device_uid[:-4], 16)  
        decoded_char = chr(codepoint)  
        id = int(decoded_char)      
        pn532.close()  
        if id != 0:
            
            #Datuak JSON bihurtu
            data = {
                "idUser": id
            }
            json_data = json.dumps(data)

            # REST POST
            response = requests.post(URL + "/check", 
                                     data = json_data, 
                                     headers = {"Content-Type": "application/json"})
            
            erantzuna = json.loads(response.text)
            print(erantzuna)
            
            if erantzuna["baimena"] == "baimenduta":
                
                print("Erabiltzailea baimenduta dago")

                # erabiltzaileari galdetu kutxatila hustuko duen -> Erreserbaren hustu denbora ezarri
                erantzuna_input = input("Zer egin? Erreserba hasi(1)/ Kutxatila ireki(2)/ Erreserba amaitu(3)")

                #Zerbitzariari bidaltzen dio empty time betetzeko mezua
                if erantzuna_input == "1":
                    print("Erreserba hasi aukera")
                    
                    hasi_data = {
                        "idErreserba": int(erantzuna["idErreserba"])
                    }
                    hasi_data_j = json.dumps(hasi_data)

                    response = requests.post(URL + "/hasi", 
                                     data = hasi_data_j, 
                                     headers = {"Content-Type": "application/json"})
                    
                    

                elif erantzuna_input == "2":
                    print("Kutxatila ireki aukera")
                    
                    

                elif erantzuna_input == "3":
                    print("Erreserba amaitu aukera")
                    
                    amaitu_data = {
                        "idErreserba": int(erantzuna["idErreserba"])
                    }
                    amaitu_data_j = json.dumps(amaitu_data)

                    response = requests.post(URL + "/amaitu", 
                                     data = amaitu_data_j, 
                                     headers = {"Content-Type": "application/json"})
                    
                else:
                    print("ERROREA: espero ez zen erantzuna bidali da")
                

                #Kutxatila ireki prozesua
                    GPIO.output(LED_PIN, GPIO.HIGH)
                    print("Kutxatila irekiko da")
                    time.sleep(5)
                    GPIO.output(LED_PIN, GPIO.LOW)


            elif erantzuna["baimena"] == "ezbaimenduta":
                print("Erabiltzailea ez dago baimenduta kutxatila irekitzeko")

            else :
                print("Baimena ez da zuzena")

        else:
            print("UserID ez zuzena irakurri da (0)")
    else:
        print("Irakurritako mezua ez da zuzena")

    GPIO.cleanup()


 

if __name__ == '__main__':
    main()   






 


