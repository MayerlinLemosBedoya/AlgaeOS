// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AlgaeOSEscrow is ReentrancyGuard, Ownable {
    IERC20 public pyusdToken;
    
    struct Campaign {
        uint256 id;
        string name;
        string location;
        string description;
        uint256 targetAmount;
        uint256 raisedAmount;
        address beneficiary;
        bool active;
        uint256 createdAt;
    }
    
    struct Milestone {
        uint256 campaignId;
        uint256 milestoneId;
        string description;
        uint256 rewardAmount;
        bool completed;
        address attestor;
        uint256 completedAt;
        string reportHash;
        string evidenceUrl;
    }
    
    struct Sponsorship {
        address sponsor;
        uint256 campaignId;
        uint256 amount;
        uint256 timestamp;
        bool claimed;
    }
    
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => Sponsorship) public sponsorships;
    mapping(address => bool) public authorizedAttestors;
    
    uint256 public campaignCounter;
    uint256 public milestoneCounter;
    uint256 public sponsorshipCounter;
    
    event CampaignCreated(uint256 indexed campaignId, string name, address beneficiary);
    event CampaignSponsored(uint256 indexed campaignId, address indexed sponsor, uint256 amount);
    event MilestoneCreated(uint256 indexed campaignId, uint256 indexed milestoneId, uint256 rewardAmount);
    event MilestoneAttested(uint256 indexed milestoneId, address indexed attestor, string reportHash);
    event FundsReleased(uint256 indexed campaignId, uint256 amount, address beneficiary);
    
    constructor(address _pyusdToken) {
        pyusdToken = IERC20(_pyusdToken);
        _transferOwnership(msg.sender);
    }
    
    function createCampaign(
        string memory _name,
        string memory _location,
        string memory _description,
        uint256 _targetAmount,
        address _beneficiary
    ) external onlyOwner returns (uint256) {
        campaignCounter++;
        campaigns[campaignCounter] = Campaign({
            id: campaignCounter,
            name: _name,
            location: _location,
            description: _description,
            targetAmount: _targetAmount,
            raisedAmount: 0,
            beneficiary: _beneficiary,
            active: true,
            createdAt: block.timestamp
        });
        
        emit CampaignCreated(campaignCounter, _name, _beneficiary);
        return campaignCounter;
    }
    
    function sponsorCampaign(uint256 _campaignId, uint256 _amount) external nonReentrant {
        require(campaigns[_campaignId].active, "Campaign not active");
        require(_amount > 0, "Amount must be greater than 0");
        
        // Transfer PYUSD from sponsor to contract
        require(
            pyusdToken.transferFrom(msg.sender, address(this), _amount),
            "PYUSD transfer failed"
        );
        
        campaigns[_campaignId].raisedAmount += _amount;
        
        sponsorshipCounter++;
        sponsorships[sponsorshipCounter] = Sponsorship({
            sponsor: msg.sender,
            campaignId: _campaignId,
            amount: _amount,
            timestamp: block.timestamp,
            claimed: false
        });
        
        emit CampaignSponsored(_campaignId, msg.sender, _amount);
    }
    
    function createMilestone(
        uint256 _campaignId,
        string memory _description,
        uint256 _rewardAmount
    ) external onlyOwner {
        require(campaigns[_campaignId].active, "Campaign not active");
        
        milestoneCounter++;
        milestones[milestoneCounter] = Milestone({
            campaignId: _campaignId,
            milestoneId: milestoneCounter,
            description: _description,
            rewardAmount: _rewardAmount,
            completed: false,
            attestor: address(0),
            completedAt: 0,
            reportHash: "",
            evidenceUrl: ""
        });
        
        emit MilestoneCreated(_campaignId, milestoneCounter, _rewardAmount);
    }
    
    function attestMilestone(
        uint256 _milestoneId,
        string memory _reportHash,
        string memory _evidenceUrl,
        string memory _notes
    ) external {
        require(authorizedAttestors[msg.sender], "Not authorized attestor");
        require(!milestones[_milestoneId].completed, "Milestone already completed");
        
        uint256 campaignId = milestones[_milestoneId].campaignId;
        address beneficiary = campaigns[campaignId].beneficiary;
        uint256 rewardAmount = milestones[_milestoneId].rewardAmount;
        
        // Check contract has enough PYUSD
        require(
            pyusdToken.balanceOf(address(this)) >= rewardAmount,
            "Insufficient contract balance"
        );
        
        milestones[_milestoneId].completed = true;
        milestones[_milestoneId].attestor = msg.sender;
        milestones[_milestoneId].completedAt = block.timestamp;
        milestones[_milestoneId].reportHash = _reportHash;
        milestones[_milestoneId].evidenceUrl = _evidenceUrl;
        
        // Release funds to beneficiary
        require(
            pyusdToken.transfer(beneficiary, rewardAmount),
            "PYUSD transfer failed"
        );
        
        emit MilestoneAttested(_milestoneId, msg.sender, _reportHash);
        emit FundsReleased(campaignId, rewardAmount, beneficiary);
    }
    
    function addAuthorizedAttestor(address _attestor) external onlyOwner {
        authorizedAttestors[_attestor] = true;
    }
    
    function removeAuthorizedAttestor(address _attestor) external onlyOwner {
        authorizedAttestors[_attestor] = false;
    }
    
    function getCampaign(uint256 _campaignId) external view returns (Campaign memory) {
        return campaigns[_campaignId];
    }
    
    function getMilestone(uint256 _milestoneId) external view returns (Milestone memory) {
        return milestones[_milestoneId];
    }
    
    function getSponsorship(uint256 _sponsorshipId) external view returns (Sponsorship memory) {
        return sponsorships[_sponsorshipId];
    }
}
