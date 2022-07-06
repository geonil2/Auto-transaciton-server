NFT Collections Server API
======================
------------

## Summary
The application for the NFT Collections API service

## Getting Started
```
npm i

- Development
npm run dev

or

- Production
npm run build
npm run start
```

## API
https://api.immmapp.com

### `GET /nft/metadata`
#### Request
Parameters
```
address: string
network: string
```
#### Response
```
[
    {
        "id": number,
        "address": string,
        "url": string,
        "network": string,
        "name": string,
        "image": string,
        "description": string,
        "attributes": [
            {
                "trait_type": string,
                "value": string
            }
        ],
        "animation": string
    }
]
```  
<br><br/>
### `POST /nft/metadata`
#### Request
Request body
```
{
    "address": string,
    "url": string,
    "network": string
}
```
#### Response
```
[
    {
        "id": number,
        "address": string,
        "url": string,
        "network": string,
        "name": string,
        "image": string,
        "description": string,
        "attributes": [
            {
                "trait_type": string,
                "value": string
            }
        ],
        "animation": string
    }
]
```  
<br><br/>
### `DELETE /nft/metadata`
#### Request
Parameters
```
id: string
```
Header
```
Authorization: string
```

#### Response
```
"message": string
```
<br><br/>
### `GET /auto/token`
#### Request
Header
```
X-Authorization-Wallet: string
X-Authorization-Message: string
X-Authorization-Signature: string
```

#### Response
```
"address": string
"token": string
```
<br><br/>
### Common
#### Response Error
```
"message": string
```
