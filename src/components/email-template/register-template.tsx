import React from "react";

interface Props {
  code: string;
}

export const RegisterTemplate: React.FC<Props> = ({ code }) => (
  <div>
    <h2>Потдвердите Аккаунт</h2>
    <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>link to</a>
  </div>
);
