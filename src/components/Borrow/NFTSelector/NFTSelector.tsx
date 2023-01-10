import { useEffect, useMemo, useRef, useState } from "react";
import cn from "classnames";
import style from "./NFTSelector.module.css";

import { NFTItem, useAccountStore } from "store";

import { IPikachu } from "utils/typechain-types/contracts/Master.sol/Pikachu";

import nftImage from "assets/images/nftImage.png";
import {
  SvgArrowDown,
  SvgArrowRight,
  SvgEthereum,
  SvgFind,
  SvgLink,
} from "assets/images/svg";
import { Button } from "components/ui";
import Input from "components/ui/Input";

interface Props {
  pool: IPikachu.PoolStructOutput;
}

const NFTSelector = ({ pool }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const { nfts } = useAccountStore();

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const validItems = useMemo(() => {
    return nfts.filter((nft) =>
      pool?.collections.find(
        (contract) => contract.toLowerCase() === nft.contract.toLowerCase()
      )
    );
  }, [pool, nfts]);

  const queriedItems = useMemo(() => {
    return validItems.filter(
      (nft) =>
        nft.name.includes(query) ||
        nft.symbol.includes(query) ||
        nft.tokenId.toString() === query
    );
  }, [validItems, query]);

  const [currentItem, setCurrentItem] = useState<NFTItem>({
    contract: "",
    name: "",
    symbol: "",
    tokenId: 0,
  });

  useEffect(() => {
    setCurrentItem(validItems[0]);
  }, [validItems]);

  return (
    <div className={cn(style.root)} ref={ref}>
      {validItems.length === 0 ? (
        <div className={cn(style.emptyWallet)}>
          This wallet doesn't contain any NFTs right now
        </div>
      ) : (
        <>
          <div
            className={cn(style.selection)}
            onClick={() => setExpanded(!expanded)}
          >
            <img src={nftImage} alt="collection" className={cn(style.nftImg)} />
            <div className={cn(style.item)}>
              <a href={`https://opensea.io`} target="_blank" rel="noreferrer">
                {currentItem?.name}
                <SvgLink />
              </a>
              <span>
                {currentItem?.symbol} #{currentItem?.tokenId}
              </span>
            </div>

            <div className={cn(style.floorPrice)}>
              60.5 <SvgEthereum />
            </div>

            <Button sx={`h-10 w-10 ${expanded ? "rotate-180" : ""}`}>
              <SvgArrowDown />
            </Button>
          </div>

          {expanded && (
            <div className={cn(style.collections)}>
              <div className={cn(style.searchBox)}>
                <div className={cn(style.count)}>
                  <SvgArrowRight /> Verified NFTs ({validItems.length})
                </div>

                <Input
                  placeholder="Search by collection name..."
                  sx="h-12"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  icon={<SvgFind className="mt-2" />}
                />
              </div>

              <div className={cn(style.list)}>
                {queriedItems.map((nft, index) => (
                  <div
                    className={cn(style.row)}
                    key={index}
                    onClick={() => {
                      setCurrentItem(queriedItems[index]);
                      setExpanded(false);
                    }}
                  >
                    <img
                      src={nftImage}
                      alt="collection"
                      className={cn(style.nftImg)}
                    />
                    <div className={cn(style.item)}>
                      <a
                        href={`https://opensea.io`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {nft.name}
                        <SvgLink />
                      </a>
                      <span>
                        {nft.symbol} #{nft.tokenId}
                      </span>
                    </div>

                    <div className={cn(style.floorPrice)}>
                      60.5 <SvgEthereum />
                    </div>

                    <hr />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NFTSelector;
