import SQ from 'sequelize';
import { sequelize } from "../db/database";
import {NFT} from "../type/nft";

const DataTypes = SQ.DataTypes;

export const Nft = sequelize.define('nft', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  address: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  network: {
    type: DataTypes.STRING(45),
    allowNull: false
  }
}, { timestamps: false });

export const createNFTList = async (nftData: NFT) => {
  const findNFT = await findSameNFT(nftData)
  console.log(findNFT)
  if (!findNFT) {
    return await createNFT(nftData);
  }
  //@ts-ignore
  return findNFT.dataValues;
}

export const findMyNFTData = async (address: string, network: string) => {
  return Nft.findAll({ where: { address, network }})
  .then((data) => (
    //@ts-ignore
    data.map(nft => nft.dataValues)
  ));
}

export const findSameNFT = async (nftData: NFT) => {
  //@ts-ignore
  return await Nft.findOne({ where: nftData })
}

const createNFT = async (nftData: NFT) => {
  //@ts-ignore
  return Nft.create(nftData).then((data) => data.dataValues);
}

export const removeNFT = async (id: number) => {
    return Nft.findByPk(id)
    .then((nft) => {
      nft ? nft.destroy() : null;
    });

}
