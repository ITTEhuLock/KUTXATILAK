import requests, time, nfc

global id
def main():

    
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

    elif response.baimena == "ezbaimenduta":
        print("Erabiltzailea ez dago baimenduta kutxatila irekitzeko")
    else :
        print("Baimena ez da zuzena")



def nfcread():
    id = None
    try:
        clf = nfc.ContactlessFrontend('tty:S0')  
        if clf:
            print("PN532 NFC reader connected")
            while id == None:
                print("Waiting for an NFC tag...")
                clf.connect(rdwr={'on-connect': on_connect})
                time.sleep(1)  
        else:
            print("Failed to connect to PN532 NFC reader")
    except KeyboardInterrupt:
        print("Exiting...")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        if clf:
            clf.close()


def on_connect(tag):
    print(f"Tag detected: {tag}")
    if tag.ndef:
        print("NDEF is supported by this tag")
        ndef_message = tag.ndef.message
        if ndef_message:
            id = ndef_message
            print("NDEF Message:")
            for record in ndef_message:
                print(f"Record: {record}")
                if record.type == 'text':
                    print(f"Text: {record.text}")
                elif record.type == 'uri':
                    print(f"URI: {record.uri}")
                else:
                    print(f"Unsupported record type: {record.type}")
        else:
            print("No NDEF message found on the tag")
    else:
        print("NDEF is not supported by this tag")
    return True  # Keep the connection alive

        
def ireki():
    ireki=1
    print("Kutxatila irekiko da")

def itxi():
    itxi=1
    print("Kutxatila itxiko da")

if __name__ == '__main__':
    main()   







    
        
def ireki():
    ireki=1

def itxi():
    itxi=1

if __name__ == '__main__':
    main()   


