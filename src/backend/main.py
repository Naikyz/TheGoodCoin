from fastapi import FastAPI
from productType import Product
from json import dumps, loads
from os.path import exists

app = FastAPI()

headers = {
    'x-api-key': 'VN1V84XJ2undibI57qrvFpKSnMlNFDta',
    'Content-Type': 'application/json'
}


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/watcher/")
async def create_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    data.append(
        {"address": params["address"], "product": params["product"], "product_address": params["product_address"],
         "price": params["price"]})
    print(data)
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200


@app.get("/getallwatcher/")
async def get_watchers():
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    return data
