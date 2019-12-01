pragma solidity ^0.5.1;

 
contract ImageContracts  {
 

    struct auditEvent {
        string auditType; // eg stages in home improvement work
        string imageProofHash; // ipfs hash code
        bool completed; // both parties accept the evidence (image proof)
        bool disputed;
        uint partConsideration; //payment to make
        bool partConsiderationPaid;
        bool exists;
    }
 
    struct contractForm {
       string contractName;
       uint contractConsideration;
       bool contractFormed; // offer and acceptance completed
       bool considerationPaid;
       bool completed;
       bool disputed;
       uint[] audits; // audit done
    }
    
    struct contactAudit{
        uint audits;
        
    }
    
    // map contract id to events, eg stages in home improvements
    mapping(uint => auditEvent) public auditEvents;  
    mapping(address => mapping (address => contractForm)) public contractForms;   // buyer and seller have contract, add date for multiple contracts
    
    
    function addContractForm(string memory contractName,
                       address Buyer, address Seller, uint contractConsideration
    ) public {
        bool contractFormed = true;
        bool considerationPaid = false;
        bool completed=false;
        bool disputed=false;
        uint[] memory audits;
    
        contractForm memory aContractForm = contractForm(contractName, contractConsideration,  
        contractFormed, considerationPaid, completed, disputed, audits);  
        
        contractForms[Buyer][Seller]=aContractForm;
    }
    
   
    function addAuditEvent(uint auditEventIndex,
                       string memory auditType,
                       string memory imageProofHash,
                       bool completed, bool disputed, uint partConsideration, bool partConsiderationPaid
    ) public {
        
        require (!auditEvents[auditEventIndex].exists);
        auditEvents[auditEventIndex].auditType=auditType;
        auditEvents[auditEventIndex].disputed=disputed;
        auditEvents[auditEventIndex].exists=true;   
        auditEvents[auditEventIndex].imageProofHash=imageProofHash;
        auditEvents[auditEventIndex].completed=completed;
        auditEvents[auditEventIndex].partConsideration=partConsideration;
        auditEvents[auditEventIndex].partConsiderationPaid=partConsiderationPaid;
  
    }
    
    function getLastAuditEvent(address Buyer, address Seller) view public returns (uint) {
         uint numberAudits = contractForms[Buyer][Seller].audits.length;
         return numberAudits;
    }
    
    
    
        
    
  
}

   
