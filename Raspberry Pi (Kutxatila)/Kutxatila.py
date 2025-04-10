import logging, requests, json, time
import RPi.GPIO as GPIO
from PN532 import PN532

logging.basicConfig(level=logging.DEBUG)
 


def callbackPN532(tag, id):
    print('Found tag: {}, id: {}'.format(tag, id))

def main():
    URL = "http://192.168.137.1:3000/raspberry/check"
    #Mugikorraren aplikazioa NFC eskaera jaso dezan erabili behar den id-a
    AID = "F0010203040506"
    LED_PIN = 22
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(LED_PIN, GPIO.OUT)  
    GPIO.output(LED_PIN, GPIO.LOW)
    #NFC modulua hasieratu
    pn532 = PN532('tty:S0',AID,callbackPN532)
    
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
            response = requests.post(URL, 
                                     data = json_data, 
                                     headers = {"Content-Type": "application/json"})
            
            erantzuna = json.loads(response.text)
            print(erantzuna)
            
            if erantzuna["baimena"] == "baimenduta":
                print("Erabiltzailea baimenduta dago")

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






 


