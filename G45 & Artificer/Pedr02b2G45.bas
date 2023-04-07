// This function is used to initialize parameters during install time
// InitializePrivate initializes a private SC
Function Initialize() Uint64
10  STORE("owner", SIGNER())   // Store in DB  ["owner"] = address
20 RETURN 0 
End Function

// This function is used to change owner 
// owner is an string form of address 
Function TransferOwnership(newowner String) Uint64 
10  IF LOAD("owner") == SIGNER() THEN GOTO 30 
20  RETURN 1
30  STORE("tmpowner",ADDRESS_RAW(newowner))
40  RETURN 0
End Function

// Until the new owner claims ownership, existing owner remains owner
Function ClaimOwnership() Uint64 
10  IF LOAD("tmpowner") == SIGNER() THEN GOTO 30 
20  RETURN 1
30  STORE("owner",SIGNER()) // ownership claim successful
40  RETURN 0
End Function

Function InitializeNFT(collection String, metadataFormat String, metadata String) Uint64
1 IF EXISTS("minter") == 1 THEN GOTO 11
2 STORE("minter", SIGNER())
3 STORE("type", "G45-NFT")
4 STORE("owner", SIGNER())
5 STORE("timestamp", BLOCK_TIMESTAMP())
6 SEND_ASSET_TO_ADDRESS(SIGNER(), 1, SCID())
7 STORE("collection", collection)
8 STORE("metadataFormat", metadataFormat)
9 STORE("metadata", metadata)
10 RETURN 0
11 RETURN 1
End Function

Function DisplayNFT() Uint64
1 IF ADDRESS_STRING(SIGNER()) == "" THEN GOTO 5
2 IF ASSETVALUE(SCID()) != 1 THEN GOTO 5
3 STORE("owner", ADDRESS_STRING(SIGNER()))
4 RETURN 0
5 RETURN 1
End Function

Function RetrieveNFT() Uint64
1 IF LOAD("owner") != ADDRESS_STRING(SIGNER()) THEN GOTO 5
2 SEND_ASSET_TO_ADDRESS(SIGNER(), 1, SCID())
3 STORE("owner", "")
4 RETURN 0
5 RETURN 1
End Function