from fastapi import FastAPI
from json import dumps, loads
from os.path import exists
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

headers = {
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


@app.post("/CID")
async def create_watcher(params: dict):
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    for d in data:
        if d["CID"] == params["CID"]:
            return 400
    data.append(
        {"name": params["name"], "description": params["description"], "price": params["price"], "CID": params["CID"]})
    print(data)
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return 200


@app.get("/CID")
async def get_watchers():
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    return data


@app.delete("/CID")
def delete_watcher(params: dict):
    status = 200
    deleted_obj = None
    if exists('save.json'):
        f = open("./save.json", "r")
        data = loads(f.read())
        f.close()
        for d in data:
            if d["CID"] == params["CID"]:
                deleted_obj = d
                data.remove(d)
                status = 202
    else:
        data = []
    f = open("./save.json", "w")
    f.write(dumps(data))
    f.close()
    return status, deleted_obj


@app.post("/CID/sales")
def create_sale(params: dict):
    status, sold_obj = delete_watcher({"CID": params["CID"]})
    if status == 202:
        if exists('sales.json'):
            f = open("./sales.json", "r")
            data = loads(f.read())
            f.close()
        else:
            data = []
        data.append({"owner": params["owner"], "item": sold_obj})
        f = open("./sales.json", "w")
        f.write(dumps(data))
        f.close()
        return 202
    return 400


@app.get("/sales/{owner}")
async def get_sales(owner: str):
    if exists('sales.json'):
        f = open("./sales.json", "r")
        data = loads(f.read())
        f.close()
    else:
        data = []
    return [d["item"] for d in data if d["owner"] == owner]
