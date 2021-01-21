from fastapi import FastAPI
import uvicorn
from utils import sha3_256_base58, get_http
from config import TWITTER_BEARER_TOKEN


app = FastAPI()


def generate_code(twitter_user: str, wallet_address: str):
    return sha3_256_base58(f"{twitter_user}{wallet_address}".encode('utf-8')).decode('utf-8')[:20]


@app.get("/assign-twitter")
async def assign_twitter(twitter_user: str, wallet_address: str):
    identifier = generate_code(twitter_user, wallet_address)

    search_query = f"from:{twitter_user} {identifier}"
    headers = {
        'Authorization': f"Bearer {TWITTER_BEARER_TOKEN}"
    }
    url = f"https://api.twitter.com/2/tweets/search/recent?query={search_query}"
    result = await get_http(url, headers=headers)

    result_count = result['meta']['result_count']
    verified = result_count >= 1
    return {
        'verified': verified
    }


@app.get("/generate")
async def generate(twitter_user: str, wallet_address: str):
    return {
        'code': generate_code(twitter_user, wallet_address)
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)
