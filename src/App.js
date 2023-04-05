import './App.css';
import to from 'await-to-js';
import DeroBridgeApi from 'dero-rpc-bridge-api';
import React from 'react';
import { useState, useCallback } from 'react';
import 'tailwindcss/tailwind.css';
import tech from './assets/tech.mp4';


function App() {

    const deroBridgeApiRef = React.useRef()
    const [bridgeInitText, setBridgeInitText] = React.useState('') // text that displays if connected to bridge
    // const [rando, setRando] = React.useState(null)
    // const [lotterygiveback, setlotterygiveback] = React.useState(null)
    // const [lotteryeveryXdeposit, setlotteryeveryXdeposit] = React.useState(null)
    const [address, setAddress] = useState(null)
    const [balance, setBalance] = useState(null)
    const [isConnected, setIsConnected] = useState(false);
    const [assetWalletBalance, setAssetWalletBalance] = useState(null)
    const [scid1, setScid1] = useState('');
    const [amount1, setAmount1] = useState(0);
    const [recipient, setRecipient] = useState('');
    const [assetScid, setAssetScid] = useState('');



    React.useEffect(() => {
      const load = async () => {
        deroBridgeApiRef.current = new DeroBridgeApi()
        const deroBridgeApi = deroBridgeApiRef.current
        const [err] = await to(deroBridgeApi.init())
        if (err) {
          setBridgeInitText('failed to connect to extension');
          setIsConnected(false);
        } else {
          setBridgeInitText('connected to extension');
          setIsConnected(true);
        }
      }
  
      window.addEventListener('load', load)
      return () => window.removeEventListener('load', load)
    }, [])
  
    // const UpdateRando = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    //     scid:"aa5943a26940175eeea327d938d7febccaf0948a4a271d5b3dae15edeb95e190",
    //     ringsize:2,
    //     sc_rpc:[
    //       {
    //         name: "entrypoint",
    //         datatype: "S",
    //         value:"SetRandomInteger"
    //       }
    //     ]
    //   }))
    // })

    // const GetRando = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    //     scid:"aa5943a26940175eeea327d938d7febccaf0948a4a271d5b3dae15edeb95e190",
    //     variables: true
    //   }))
    //   setRando(res.data.result.stringkeys.Rando)
    // })

    // const Getlotterygiveback = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    //     scid:"d1c1ed28b9013b4b4fc5227adfaaac6d3a496763986311e2027f7d76662884ec",
    //     variables: true
    //   }))
    //   setlotterygiveback(res.data.result.stringkeys.lotterygiveback)
    // })

    // const GetlotteryeveryXdeposit = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    //     scid:"d1c1ed28b9013b4b4fc5227adfaaac6d3a496763986311e2027f7d76662884ec",
    //     variables: true
    //   }))
    //   setlotteryeveryXdeposit(res.data.result.stringkeys.lotteryeveryXdeposit)
    // })



    // const withdraw = React.useCallback(async (event) => {
    //   event.preventDefault();
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    //     "scid": event.target.scid.value,
    //     "ringsize": 2,
    //     "sc_rpc": [{
    //       "name": "entrypoint",
    //       "datatype": "S",
    //       "value": "Withdraw"
    //     },
    //       {
    //       "name": "asset",
    //       "datatype": "S",
    //       "value": event.target.asset.value
    //     },
    //     {
    //       "name": "amount",
    //       "datatype": "U",
    //       "value": parseInt(event.target.amount.value)
    //     }]
    //   }))

      
  
    //   console.log(err)
    //   console.log(res)
    // }, [])
  

    const transferDERO = React.useCallback(async () => {
      const deroBridgeApi = deroBridgeApiRef.current
      const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
        transfers: [{
          destination: 'deto1qywgdwt9j6la3gfn5859czqqzg7c4cc856f2w5lxusg494ytkaflkqqrw7mmz',
          amount: 100000,
        }]
      }))
  
      if (err) alert(err.message)
      else alert(JSON.stringify(res))
    }, [])
  
    // const transferAsset = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    //     transfers: [{
    //       scid: 'd80bd69e9945251b9a0127f064268d0629e743fa7fffb14ad74dbb366f932291',
    //       destination: 'deto1qyg7mqwag7lch9267dttyrxy5jlc8tqwedtel77kpq0zh2zr7rvlsqgs2cz33',
    //       amount: 1,
    //     }, {
    //       scid: 'd80bd69e9945251b9a0127f064268d0629e743fa7fffb14ad74dbb366f932291',
    //       destination: 'deto1qyg7mqwag7lch9267dttyrxy5jlc8tqwedtel77kpq0zh2zr7rvlsqgs2cz33',
    //       burn: 1,
    //     }]
    //   }))
  
    //   if (err) alert(err.message)
    //   else alert(JSON.stringify(res))
    // }, [])

    const transferAsset = useCallback(async (event) => {
      event.preventDefault();
      const deroBridgeApi = deroBridgeApiRef.current
      const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
        transfers: [{
          scid: scid1,
          destination: recipient,
          amount: parseInt(amount1, 10),
        }, {
          scid: scid1,
          burn: 1,
        }]
      }));
  
      if (err) alert(err.message);
      else alert(JSON.stringify(res));
    }, [scid1, amount1, recipient]);

    // const transferAsset = React.useCallback(async () => {
    //   const deroBridgeApi = deroBridgeApiRef.current
    //   const [err, res] = await to(deroBridgeApi.wallet('start-transfer', {
    //     transfers: [{
    //       scid: '9a262a2ae790301715ffd09f249f2122e5b2125b4036a71b45c62085b676bed2',
    //       destination: 'deto1qy36kf7ns8ew5k2v3at5n3d67gm4fyl3sxn3jkxaasmh4ryz0m44qqgk8kztw',
    //       amount: 1,
    //     }, {
    //       scid: '9a262a2ae790301715ffd09f249f2122e5b2125b4036a71b45c62085b676bed2',
    //       destination: '',
    //       burn: 1,
    //     }]
    //   }))
  
    //   if (err) alert(err.message)
    //   else alert(JSON.stringify(res))
    // }, [])
  
    const getWalletAddress = useCallback(async () => {
      const deroBridgeApi = deroBridgeApiRef.current
      const [err, res] = await to(deroBridgeApi.wallet('get-address'))
      if (err) alert(err.message)
      else {
      const address = res.data.result.address;
      setAddress(address)
      }
    }, [])

    const getWalletBalance = useCallback(async () => {
      const deroBridgeApi = deroBridgeApiRef.current;
      const [err, res] = await to(deroBridgeApi.wallet("get-balance"));
      if (err) {
        alert(err.message);
      } else {
        const balance = res.data.result.balance;
        setBalance(balance);
      }
    }, []);
    
    const getWalletAssetBalance = React.useCallback(async () => {
      const deroBridgeApi = deroBridgeApiRef.current;
      const [err, res] = await to(deroBridgeApi.wallet('get-balance', { SCID: '9bed9ab781c3006bf8bb29367f4c71c1d36e785edaebf35cefa9c3303bcb14c8' }));
      if (err) alert(err.message);
      else 
      {
        const assetWalletBalance = res.data.result.balance;
        setAssetWalletBalance(assetWalletBalance);
        };
    }, [])
    
    
  return (
    <div className="App items-center justify-center flex flex-col w-full mt-20 text-white">
      <div className={`rounded-full px-4 py-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}>
          {isConnected ? 'Connected' : 'Not Connected'}
          </div>

      <video autoPlay muted loop className="bg-video">
            <source src={tech} type="video/mp4" />
          </video>
        <div className="function">
    {/* <h3> Withdraw Funds </h3> 
    <form onSubmit={withdraw}>
      <p>SCID</p>
      <input id="scid" type="text" />
      <p>Asset</p>
      <input id="asset" type="text" />
      <p>Amount</p>
      <input id="amount" type="text" />
      <button type={"submit"}>Withdraw</button>
    </form> */}
       <form onSubmit={transferAsset}>
      <p>SCID</p>
      <input className='text-black' id="scid1" type="text" value={scid1} onChange={(e) => setScid1(e.target.value)} />
      <p>Amount</p>
      <input className='text-black' id="amount1" type="text" value={amount1} onChange={(e) => setAmount1(e.target.value)} />
      <p>Recipient</p>
      <input className='text-black' id="amount1" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
      <div><button className="mt-3 pulse text-white font-bold py-2 px-4 rounded" type="submit">Transfer</button></div>
    </form>
    <div className='mt-10' >
    <h3> Transfer DERO</h3>
    <form className='mt-5' onSubmit={transferDERO}>
      <p>Recipient Wallet Address</p>
      <input
      className="input-3d bg-white p-2 text-black rounded border border-gray-300 hover:transform hover:-rotate-x-20 hover:rotate-y-20 transition-transform duration-500"
      id="walletaddress" 
      type="text"
      placeholder='Recipient Wallet Address' />
      <p>Amount</p>
      <input
       className="input-3d bg-white p-2 text-black rounded border border-gray-300 hover:transform hover:-rotate-x-20 hover:rotate-y-20 transition-transform duration-500"
      id="amount" 
      placeholder='Amount'
      type="text" />
    </form>
    <div className='mt-5' >
    <button className="pulse text-white font-bold py-2 px-4 rounded" onClick={transferDERO}>Transfer DERO</button>
        <div><button className="mt-5 pulse text-white font-bold py-2 px-4 rounded" onClick={getWalletAddress}>Get address</button></div>
        {address}
        <div><button className="mt-5 pulse text-white font-bold py-2 px-4 rounded" onClick={getWalletBalance}>Get Balance</button></div>
        <p>{balance}</p>
        <div>
        <div>
        <p>Asset SCID</p>
        <input
          className="text-black"
          id="assetScid"
          type="text"
          value={assetScid}
          onChange={(e) => setAssetScid(e.target.value)}
        />
        </div>
        <button className="mt-5 pulse text-white font-bold py-2 px-4 rounded" onClick={getWalletAssetBalance}>Get Wallet Asset Balance</button></div>
        <p>{assetWalletBalance}</p>
        {/* <button onClick={transferAsset}>Transfer ASSET</button> */}
    </div>
    {/* <h3>TransferAsset</h3>
    <form onSubmit={transferAsset}>
      <p>SCID</p>
      <input id="SCIDFrom" type="text" />
      <p>Wallet</p>
      <input id="DestinationToo" type="text" />
      <p>Amount</p>
      <input id="amountOut" type="text" />
      <p>SCID</p>
      <input id="SCIDToo" type="text" />
      <p>Wallet</p>
      <input id="walletaddress" type="text" />
      <button type={"submit"}>Transfer</button>
    </form> */}
    </div>
  </div >
    </div>
  );
}

export default App;