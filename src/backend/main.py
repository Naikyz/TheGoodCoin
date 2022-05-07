from fastapi import FastAPI
from productType import Product
from json import dumps, loads
from os.path import exists
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

headers = {
    'x-api-key': 'VN1V84XJ2undibI57qrvFpKSnMlNFDta',
    'Content-Type': 'application/json'
}

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/CID/")
async def create_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    data.append({"name": params["name"], "description": params["description"],"price": params["price"], "cid": params["cid"]})
    print(data)
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200


@app.get("/CID/")
async def get_watchers():
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    return data


@app.delete("/CID/")
async def delete_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    data.remove(params["CID"])
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200
