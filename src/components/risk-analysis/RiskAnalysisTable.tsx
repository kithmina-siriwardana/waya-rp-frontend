"use client";
import { FormattedTableDataItem } from "@/types/risk-analysis";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CSSProperties } from "react";

const columns: ColumnsType<FormattedTableDataItem> = [
  {
    title: "Index",
    dataIndex: "key",
    key: "key",
    render: (text: string) => <>{text}</>,
    width: "10%",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    width: "15%",
  },
  {
    title: "Staff ID",
    dataIndex: "staffId",
    key: "staffId",
    width: "15%",
  },
  {
    title: "Prediction",
    dataIndex: "prediction",
    key: "prediction",
    width: "15%",
  },
  {
    title: "Confidence",
    dataIndex: "confidence",
    key: "confidence",
    width: "15%",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    width: "15%",
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    width: "15%",
  },
];

const headerStyle: CSSProperties = {
  backgroundColor: "#ECF1FC",
};

const RiskAnalysisTable = ({
  tableData,
  handleRowClick,
}: {
  tableData: FormattedTableDataItem[];
  handleRowClick: (recordId: string) => void;
}) => {
  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={{ pageSize: 9 }}
      rowKey="key"
      onRow={(record) => {
        return {
          onClick: () => {
            handleRowClick(record.id);
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

export default RiskAnalysisTable;
