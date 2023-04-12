// Issue tokens after depositing DERO (Convert DERO to TOKENX)
Function IssueTOKENX() Uint64
10  LET token_amount = DEROVALUE() / 100000 // Calculate the number of tokens to be issued (1 DERO = 100 tokens)
20  SEND_ASSET_TO_ADDRESS(SIGNER(), token_amount, SCID()) // Increment balance of user, without knowing original balance, this is done homomorphically
30  RETURN 0
End Function

// Convert TOKENX to DERO after depositing TOKENX. Smart Contract can give DERO, Only if DERO balance exists.
Function ConvertTOKENX() Uint64
10  LET dero_amount = ASSETVALUE(SCID()) * 100000 // Calculate the DERO amount to be given (100 TOKENX = 1 DERO)
20  SEND_DERO_TO_ADDRESS(SIGNER(), dero_amount) // Increment balance of user, without knowing original balance, this is done using Homomorphic Encryption.
30  RETURN 0
End Function


// This function is used to initialize parameters during install time
// InitializePrivate initializes a private SC
Function InitializePrivate() Uint64
10 STORE("owner", SIGNER())   // Store in DB  ["owner"] = address
15 STORE("tokenName", "PEDR0TOKEN")
16 STORE("tokenSymbol", "PTN")
17 STORE("tokenImageURL", "https://ibb.co/3MsRCQp")
18 STORE("tokenDecimals", 5)
30 SEND_ASSET_TO_ADDRESS(SIGNER(), 1600000, SCID()) // Gives initial encrypted balance of 1600000. 
40 RETURN 0 
End Function


// Functions to retrieve token information
Function GetTokenName() String
10 RETURN LOAD("tokenName")
End Function

Function GetTokenSymbol() String
10 RETURN LOAD("tokenSymbol")
End Function

Function GetTokenImageURL() String
10 RETURN LOAD("tokenImageURL")
End Function

Function GetTokenDecimals() Uint64
10 RETURN LOAD("tokenDecimals")
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

// if signer is owner, withdraw any requested funds
// if everthing is okay, they will be showing in signers wallet
Function Withdraw( amount Uint64) Uint64 
10 IF LOAD("owner") == SIGNER() THEN GOTO 30 
20 RETURN 1 
30 SEND_DERO_TO_ADDRESS(SIGNER(),amount) 
40 RETURN 0 
End Function

// if signer is owner, provide him rights to update code anytime
// make sure update is always available to SC
Function UpdateCode( code String) Uint64 
10  IF LOAD("owner") == SIGNER() THEN GOTO 30 
20  RETURN 1
30  UPDATE_SC_CODE(code)
40  RETURN 0
End Function