import { useState } from "react";
import { useSettingStore } from "store";

import style from "./CollectionSetting.module.css";
import cn from "classnames";

import { Button, TextCopier } from "components/ui";
import CollectionModal from "../CollectionModal";
import ImageERC721 from "assets/images/template-erc721.png";
import { beautifyAddress } from "utils/helpers/string.helpers";
import { SvgArrowDown, SvgEdit, SvgTrash } from "assets/images/svg";

const CollectionSetting = () => {
  const [collectionModalVisible, setCollectionModalVisible] = useState(false);

  const { collections } = useSettingStore();
  return (
    <div className={cn(style.root)}>
      <>
        <CollectionModal
          visible={collectionModalVisible}
          setVisible={setCollectionModalVisible}
        />
      </>
      <div className={cn(style.header)}>
        <div />
        <span>Collection</span>
        <span>Contract</span>
        <Button
          variant="yellow"
          onClick={() => setCollectionModalVisible(true)}
        >
          Add Collection
        </Button>
      </div>

      <div className={cn(style.collections)}>
        {collections.map((collection, index) => (
          <div key={index} className={cn(style.row)}>
            <span>{index + 1}</span>

            <div className={cn(style.avatar)}>
              <img
                src={collection.imageUrl}
                alt="collection"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = ImageERC721;
                }}
              />
              <span>{collection.name}</span>
            </div>

            <div className={cn(style.address)}>
              <span>{beautifyAddress(collection.contract, 6)}</span>
              <TextCopier text={collection.contract} />
            </div>

            <div className={cn(style.actions)}>
              <Button>
                <SvgEdit />
              </Button>
              <Button>
                <SvgTrash />
              </Button>
              <Button sx="rotate-180" disabled={index === 0}>
                <SvgArrowDown />
              </Button>
              <Button disabled={index + 1 === collections.length}>
                <SvgArrowDown />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSetting;
