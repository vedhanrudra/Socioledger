import React from "react";
import {
  IconTrendingUp,
  IconTrendingDown,
  IconWallet,
  IconCreditCard,
  IconCash,
  IconBuildingBank,
  IconChartBar,
  IconActivity,
  IconPigMoney,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  const cards = [
    {
      title: "Total Revenue",
      value: "₹0",
      trendUp: true,
      icon: <IconWallet className="size-5 text-blue-500" />,
      footer: "Revenue growth this month",
    },
    {
      title: "Net Profit / Loss",
      value: "₹54,000",
      trend: "-20%",
      trendUp: false,
      icon: <IconTrendingDown className="size-5 text-red-500" />,
      footer: "Profit dipped this quarter",
    },
    {
      title: "Pending Receipts",
      value: "₹12,300",
      trend: "+10%",
      trendUp: true,
      icon: <IconCash className="size-5 text-orange-500" />,
      footer: "Receipts yet to be cleared",
    },
    {
      title: "Pending Payments",
      value: "₹9,400",
      trend: "+5%",
      trendUp: true,
      icon: <IconCreditCard className="size-5 text-indigo-500" />,
      footer: "Outstanding vendor payments",
    },
    {
      title: "Cash Flow",
      value: "₹1,20,000",
      trend: "+8%",
      trendUp: true,
      icon: <IconActivity className="size-5 text-green-500" />,
      footer: "Healthy movement of funds",
    },
    {
      title: "Working Capital",
      value: "₹70,000",
      trend: "+6%",
      trendUp: true,
      icon: <IconBuildingBank className="size-5 text-teal-500" />,
      footer: "Operational liquidity improving",
    },
    {
      title: "Total Assets",
      value: "₹3,00,000",
      trend: "+2%",
      trendUp: true,
      icon: <IconChartBar className="size-5 text-purple-500" />,
      footer: "Asset value growth steady",
    },
    {
      title: "Profit Margin",
      value: "15%",
      trend: "+1.2%",
      trendUp: true,
      icon: <IconPigMoney className="size-5 text-emerald-500" />,
      footer: "Margins improving steadily",
    },
    {
      title: "Capital Reserve",
      value: "₹1,50,000",
      trend: "+0.5%",
      trendUp: true,
      icon: <IconBuildingBank className="size-5 text-yellow-500" />,
      footer: "Reserve funds increasing",
    },
  ];

  // Split into fixed rows
  const firstRow = cards.slice(0, 4);
  const secondRow = cards.slice(4, 7);
  const thirdRow = cards.slice(7, 9);

  const renderRow = (row, cols) => (
    <div
      className={`grid grid-cols-${cols} gap-6 px-4 py-4 lg:px-6`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {row.map((card, index) => (
        <Card
          key={index}
          className="p-4 border border-gray-200 shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] bg-white rounded-2xl"
        >
          <CardHeader className="flex justify-between items-start p-0">
            <div>
              <CardDescription className="text-gray-600 font-medium">
                {card.title}
              </CardDescription>
              <CardTitle className="text-2xl font-bold mt-2">
                {card.value}
              </CardTitle>
            </div>
            <div className="p-2 rounded-lg bg-gray-50">{card.icon}</div>
          </CardHeader>

          <CardAction className="mt-3">
            <Badge
              variant="outline"
              className={`${
                card.trendUp ? "text-green-600" : "text-red-600"
              } gap-1 font-semibold`}
            >
              {card.trendUp ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
              {card.trend}
            </Badge>
          </CardAction>

          <CardFooter className="flex-col items-start gap-1.5 text-sm mt-3 p-0">
            <div className="flex gap-2 items-center font-medium text-gray-700">
              {card.footer}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      {renderRow(firstRow, 4)}
      {renderRow(secondRow, 3)}
      {renderRow(thirdRow, 2)}
    </div>
  );
}
export default SectionCards;