"use client";
import { Memory } from "@/types/memories";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const columns: ColumnsType<Memory> = [
  {
    title: "Index",
    dataIndex: "key",
    key: "index",
    render: (_, __, index) => index + 1,
    width: "10%",
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
    width: "20%",
    render: (text: string) =>
      text.slice(0, 100) + (text.length > 100 ? "..." : ""),
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "15%",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    width: "35%",
    render: (text: string) =>
      text.slice(0, 100) + (text.length > 100 ? "..." : ""),
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    width: "20%",
    render: (text: string) => formatDateTime(text),
  },
];

const headerStyle: CSSProperties = {
  backgroundColor: "#ECF1FC",
};

const RemindersTable = ({
  tableData,
  handleRowClick,
}: {
  tableData: Memory[];
  handleRowClick: (recordId: string) => void;
}) => {
  return (
    <Table
      columns={columns}
      dataSource={tableData.map((item, index) => ({
        ...item,
        key: item._id || index.toString(),
      }))}
      pagination={{ pageSize: 10 }}
      onRow={(record) => {
        return {
          onClick: () => {
            handleRowClick(record._id);
          },
          style: { cursor: "pointer" },
        };
      }}
      components={{
        header: {
          cell: (props) => (
            <th {...props} style={{ ...props.style, ...headerStyle }}>
              {props.children}
            </th>
          ),
        },
      }}
    />
  );
};

export default RemindersTable;
