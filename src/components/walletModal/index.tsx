import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  SelectProps,
} from "antd";
import { ConvertNumber, formatPrice } from "../../shared/utils/convertNumber";
import TextArea from "antd/es/input/TextArea";

export const WalletModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState<string>();
  const [amount, setAmount] = useState<string>("");
  const [mode, setMode] = useState("account");

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const options: SelectProps["options"] = [
    { value: 1, label: "کیف پول اصلی" },
    { value: 2, label: "کیف پول اختیاری" },
    { value: 3, label: "کیف پول تسویه" },
  ];

  const handleChange = (value: string) => {
    console.log(`Selected: ${value}`);

    setSelectValue(value);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        تسویه حساب کیف پول
      </Button>
      <Modal
        title="تسویه کیف پول اصلی زیپ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="ثبت درخواست نسویه"
        cancelText="انصراف"
        okButtonProps={{ disabled: !selectValue || !amount }}
      >
        <hr />
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <span className="text-gray-500">موجودی فعلی:</span>
            <div>
              <span className="text-blue-600 text-3xl persian-number">
                {ConvertNumber("15000", true)}{" "}
              </span>
              <span className="text-blue-600">ریال</span>
            </div>
          </div>
          <hr />

          <div>
            <Radio.Group
              style={{ marginBottom: 8 }}
              value={mode}
              onChange={handleModeChange}
            >
              <Radio.Button defaultChecked={true} value={"account"}>
                به حساب
              </Radio.Button>
              <Radio.Button value={"wallet"}>به کیف پول</Radio.Button>
            </Radio.Group>
          </div>

          <div className="flex flex-col gap-2">
            <label>*مقصد تسویه</label>
            <Select
              size={"middle"}
              placeholder={"انتحاب شماره شبا و یا شبا جدید"}
              style={{ width: "100%" }}
              options={options}
              onChange={handleChange}
              value={selectValue}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>*مبلغ تصویه</label>
            <Input
              suffix={<span className="text-gray-400">ریال</span>}
              onChange={(e) => setAmount(e.target.value)}
              value={formatPrice(amount!)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>توضیحات(بابت)</label>
            <TextArea allowClear />
          </div>
        </div>
      </Modal>
    </>
  );
};
