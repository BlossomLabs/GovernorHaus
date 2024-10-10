type ToastOptions = {
  title: string;
  description: string;
  variant: "default" | "destructive";
};

function walletNotConnectedToast(toast: (options: ToastOptions) => void) {
  toast({
    title: "Please connect your wallet",
    description: "You need to connect your wallet to create a DAO",
    variant: "destructive",
  });
}

function wrongNetworkToast(toast: (options: ToastOptions) => void) {
  toast({
    title: "Please connect to the correct network",
    description: "You need to connect to the correct network to create a DAO",
    variant: "destructive",
  });
}

function loginErrorToast(toast: (options: ToastOptions) => void) {
  toast({
    title: "Error",
    description: "There was an error signing in with Tally",
    variant: "destructive",
  });
}

function sendCreateDaoTxErrorToast(toast: (options: ToastOptions) => void) {
  toast({
    title: "Error",
    description: "Failed to send transaction",
    variant: "destructive",
  });
}

function processTxErrorToast(toast: (options: ToastOptions) => void) {
  toast({
    title: "Error",
    description: "Failed to process transaction logs",
    variant: "destructive",
  });
  return;
}

export {
  walletNotConnectedToast,
  wrongNetworkToast,
  loginErrorToast,
  sendCreateDaoTxErrorToast,
  processTxErrorToast,
};
