// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BiomassMarketplace is ReentrancyGuard, Ownable {
    IERC20 public pyusdToken;
    
    struct BiomassLot {
        uint256 id;
        uint256 campaignId;
        string campaignName;
        uint256 amount; // kg
        uint256 price; // PYUSD
        address seller;
        bool available;
        uint256 harvestDate;
        string quality;
        string location;
        uint256 createdAt;
    }
    
    mapping(uint256 => BiomassLot) public biomassLots;
    mapping(address => uint256[]) public sellerLots;
    
    uint256 public lotCounter;
    
    event LotCreated(uint256 indexed lotId, uint256 campaignId, uint256 amount, uint256 price);
    event LotPurchased(uint256 indexed lotId, address indexed buyer, uint256 amount, uint256 price);
    
    constructor(address _pyusdToken) {
        pyusdToken = IERC20(_pyusdToken);
        _transferOwnership(msg.sender);
    }
    
    function createLot(
        uint256 _campaignId,
        string memory _campaignName,
        uint256 _amount,
        uint256 _price,
        uint256 _harvestDate,
        string memory _quality,
        string memory _location
    ) external returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        
        lotCounter++;
        biomassLots[lotCounter] = BiomassLot({
            id: lotCounter,
            campaignId: _campaignId,
            campaignName: _campaignName,
            amount: _amount,
            price: _price,
            seller: msg.sender,
            available: true,
            harvestDate: _harvestDate,
            quality: _quality,
            location: _location,
            createdAt: block.timestamp
        });
        
        sellerLots[msg.sender].push(lotCounter);
        
        emit LotCreated(lotCounter, _campaignId, _amount, _price);
        return lotCounter;
    }
    
    function purchaseLot(uint256 _lotId) external nonReentrant {
        require(biomassLots[_lotId].available, "Lot not available");
        require(biomassLots[_lotId].seller != msg.sender, "Cannot buy own lot");
        
        uint256 price = biomassLots[_lotId].price;
        
        // Transfer PYUSD from buyer to seller
        require(
            pyusdToken.transferFrom(msg.sender, biomassLots[_lotId].seller, price),
            "PYUSD transfer failed"
        );
        
        biomassLots[_lotId].available = false;
        
        emit LotPurchased(_lotId, msg.sender, biomassLots[_lotId].amount, price);
    }
    
    function getLot(uint256 _lotId) external view returns (BiomassLot memory) {
        return biomassLots[_lotId];
    }
    
    function getSellerLots(address _seller) external view returns (uint256[] memory) {
        return sellerLots[_seller];
    }
    
    function getAvailableLots() external view returns (uint256[] memory) {
        uint256[] memory availableLots = new uint256[](lotCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= lotCounter; i++) {
            if (biomassLots[i].available) {
                availableLots[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = availableLots[i];
        }
        
        return result;
    }
}
