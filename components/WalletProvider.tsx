"use client";

import { FC, ReactNode, useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

interface Props {
  children: ReactNode;
}

const AppWalletProvider: FC<Props> = ({ children }) => {
  const endpoint = useMemo(
    () =>
      process.env.NEXT_PUBLIC_HELIUS_RPC_URL ||
      "https://api.mainnet-beta.solana.com",
    []
  );

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  // Type assertions needed due to React 18 + wallet-adapter type mismatch
  // See: https://github.com/solana-labs/wallet-adapter/issues/855
  const ConnProvider = ConnectionProvider as any;
  const WalletProv = WalletProvider as any;

  return (
    <ConnProvider endpoint={endpoint}>
      <WalletProv wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProv>
    </ConnProvider>
  );
};

export default AppWalletProvider;
