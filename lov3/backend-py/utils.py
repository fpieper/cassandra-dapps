import hashlib
from aiohttp import ClientSession
import base58


def sha3_256_base58(content: bytes):
    m = hashlib.sha3_256()
    m.update(content)
    return base58.b58encode(m.digest())


async def get_http(url, headers=None):
    headers = headers or {}
    async with ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            return await response.json()
