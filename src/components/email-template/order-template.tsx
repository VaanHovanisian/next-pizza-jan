import React from "react";

interface EmailTemplateProps {
  paymentUrl: string;
  orderId: number;
}

export const OrderTemplate: React.FC<EmailTemplateProps> = ({
  paymentUrl,
  orderId,
}) => (
  <div>
    <h1>order success number {orderId}</h1>
    <p>
      link to <a href={paymentUrl}>order</a>{" "}
    </p>
  </div>
);
