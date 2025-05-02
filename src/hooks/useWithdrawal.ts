
import { useState } from "react";
import { WithdrawalMethod } from "@/types/withdrawal";

export const useWithdrawal = (methods: WithdrawalMethod[]) => {
  const [amount, setAmount] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState(methods[0].id);
  const [cardNumber, setCardNumber] = useState("");
  const [walletNumber, setWalletNumber] = useState("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, "");
    setAmount(value);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/\D/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(event.target.value));
  };

  const handleWalletNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWalletNumber(event.target.value);
  };

  const getSelectedMethod = () => {
    return methods.find(m => m.id === selectedMethodId) || methods[0];
  };

  const calculateFee = () => {
    const method = getSelectedMethod();
    const feePercentage = parseFloat(method.fee.replace("%", "")) / 100;
    const amountValue = amount ? parseInt(amount) : 0;
    return amountValue * feePercentage;
  };

  const calculateTotal = () => {
    const amountValue = amount ? parseInt(amount) : 0;
    return amountValue - calculateFee();
  };

  const isWithdrawalValid = () => {
    const method = getSelectedMethod();
    const amountValue = amount ? parseInt(amount) : 0;
    
    if (amountValue < method.minAmount) {
      return false;
    }
    
    if (selectedMethodId === "card" && cardNumber.replace(/\s/g, "").length !== 16) {
      return false;
    }
    
    if ((selectedMethodId === "qiwi" || selectedMethodId === "webmoney") && !walletNumber) {
      return false;
    }
    
    return true;
  };

  const handleWithdraw = () => {
    console.log({ 
      amount, 
      selectedMethodId, 
      paymentDetails: selectedMethodId === "card" ? cardNumber : walletNumber 
    });
    // Здесь должна быть интеграция с платежным шлюзом
  };

  return {
    amount,
    selectedMethodId,
    cardNumber,
    walletNumber,
    handleAmountChange,
    handleCardNumberChange,
    handleWalletNumberChange,
    setSelectedMethodId,
    getSelectedMethod,
    calculateFee,
    calculateTotal,
    isWithdrawalValid,
    handleWithdraw
  };
};
