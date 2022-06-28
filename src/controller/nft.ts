import { Request, Response } from 'express';
import axios from "axios";
import {createNFTList, findMyNFTData, removeNFT} from "../data/nft";
import {NFT} from "../type/nft";

export const createMetadata = async (req: Request, res: Response) => {
    const { address, url, network } = req.body;
    const urlArray = url.split(' ');
    const NFTMetadata = urlArray.map(async (url: string) => {
        const createNFT = await createNFTList({ address, url, network })
        const metadata = await getNFTdata(url);
        return { ...createNFT, ...metadata }
    })
    const metadataArray = await Promise.all(NFTMetadata);
    res.status(201).json(metadataArray);
}

export const getMetadata = async (req: Request, res: Response) => {
  const { address, network } = req.query;
  const nftData = await findMyNFTData(address as string, network as string);
  const NFTMetadata = nftData.map(async (nft: NFT) => {
    console.log(nft)
    const metadata = await getNFTdata(nft.url);
    return { ...nft, ...metadata }
  })
  const metadataArray = await Promise.all(NFTMetadata);
  res.status(200).json(metadataArray);
}

export const deleteMetadata = async (req: Request, res: Response) => {
  const { id } = req.query;
  await removeNFT(parseInt(id as string))
  res.status(200).json({ "message" : "Success delete your NFT" });
}

const getNFTdata = async (url: string) => {
  try {
    const getMetadata = await axios.get(`${url}`)
    const { name, image, description, attributes } = getMetadata.data
    const animation = getMetadata.data.animation_url ? getMetadata.data.animation_url : '';
    return { name, image, description, attributes, animation }
  } catch(e) {
    throw new Error('Failed get metadata');
    return
  }
}
