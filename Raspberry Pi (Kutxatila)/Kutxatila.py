import requests


def main():
    response = requests.get("http://192.168.137.1:3000/user")
    print(response.json())



if __name__ == '__main__':
    main()   


