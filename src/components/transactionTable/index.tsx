import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Badge, Button, Input, message, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";
import transactionData from "../../../mockData.json";
import { TransactionType } from "../../shared/types/TransactionType";
import { BankIcon } from "../../assets/svg/BankIcon";
import { ConvertNumber } from "../../shared/utils/convertNumber";
import { ConvertToPersianDate } from "../../shared/utils/convertPersianDate";
import { Copy } from "../../assets/svg/Copy";

type DataIndex = keyof TransactionType;

export const TransactionTable: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
 
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success('با موفقیت کپی شد');
    } catch (err) {
      message.error('دوباره سعی کنید');
    }
  };


  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<TransactionType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableColumnsType<TransactionType> = [
    {
      title: <div className="text-center">شماره کارت</div>,
      dataIndex: "cardNumber",
      key: "cardNumber",
      width: "20%",
      ...getColumnSearchProps("cardNumber"),
      render: (text) => (
        <div className="flex gap-2 items-center justify-center">
          <BankIcon />
          <div className="card-number">{text}</div>
        </div>
      ),
    },
    {
      title: <div className="text-center">مبلغ</div>,
      dataIndex: "amount",
      key: "amount",
      width: "20%",
      render: (text) => (
        <div className="text-center persian-number">
          ریال {ConvertNumber(text.toString(), true)}
        </div>
      ),
    },
    {
      title: <div className="text-center">تاریخ پرداخت</div>,
      dataIndex: "paidAt",
      key: "paidAt",
      width: "10%",
      render: (text) => (
        <div className="persian-number text-center">
          {ConvertToPersianDate(text)}
        </div>
      ),
    },
    {
      title: <div className="text-center">وضعیت تراکنش</div>,
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (e) => (
        <div className="text-center">
          {e ? (
            <Badge status="success" text="پرداخت موفق" />
          ) : (
            <Badge status="error" text="پرداخت ناموفق" />
          )}
        </div>
      ),
    },
    {
      title: <div className="text-center">شماره تراکنش</div>,
      dataIndex: "trackId",
      key: "trackId",
      width: "10%",
      ...getColumnSearchProps("trackId"),
      render: (text) => (
        <div className="flex justify-center items-center gap-2">
          <div
            className="cursor-pointer"
            onClick={() => copyToClipBoard(text)}
          >
            {" "}
            <Copy />
          </div>
          <div>{text}</div>
        </div>
      ),
    },
  ];

  return (
   <>
    <Table
      //@ts-ignore
      columns={columns}
      dataSource={transactionData.data}
      pagination={false}
    />
    <div className="self-start persian-number mt-4" >تعداد نتابج :  {transactionData.data.length}</div>
   </>
  );
};
