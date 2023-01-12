import style from "./CollectionModal.module.css";
import cn from "classnames";
// import { useSettingStore } from "store";
import { AceModal, Button, Input } from "components/ui";
import { useRef } from "react";
import CloseButton from "components/ui/CloseButton";

interface IProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CollectionModal = ({ visible, setVisible }: IProps) => {
  const addressRef = useRef<HTMLInputElement>(null);
  // const { setting } = useSettingStore();

  return (
    <AceModal modalVisible={visible} setModalVisible={setVisible}>
      <div className={cn(style.root)}>
        <div className={cn(style.header)}>
          Add/Edit Collection
          <CloseButton setModalVisible={setVisible} />
        </div>
        <div className={cn(style.body)}>
          <span>Contract:</span>
          <Input innerRef={addressRef} placeholder="0x" />
        </div>
        <div className={cn(style.footer)}>
          <Button variant="gray" onClick={() => setVisible(false)}>
            Cancel
          </Button>
          <Button
            variant="yellow"
            onClick={() => console.log(addressRef.current?.value)}
          >
            Save
          </Button>
        </div>
      </div>
    </AceModal>
  );
};

export default CollectionModal;
