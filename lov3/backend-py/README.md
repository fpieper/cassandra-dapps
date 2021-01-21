# lov3

## Setup & Config
Set Twitter `Bearer Token` in `config.py`
```
cp config.sample.py config.py
nano config.py
```

Install dependencies and launch api
```
pip install -r requirements.txt
python3 api.py
```

## Example usage
```
http://localhost:8080/generate?twitter_user=john_smith&wallet_address=0x94949494
http://localhost:8080/assign-twitter?twitter_user=john_smith&wallet_address=0x94949494
```
