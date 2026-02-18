import styled from "styled-components";

const Card = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(226, 235, 240, 0.9);
  background: #ffffff;
  color: #1f313b;
  box-shadow: 0 4px 12px rgba(14, 46, 60, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6a7d88;
  margin: 0;
`;

const CardContent = styled.div`
  padding: 24px;
  padding-top: 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 24px;
  padding-top: 0;
`;

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
