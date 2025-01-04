from pydantic import BaseModel
from app.models.user import UserRole
from typing import List

class AddressBase(BaseModel):
    """Base model for address."""
    street: str
    city: str
    state: str
    country: str
    postal: int

class PaymentBase(BaseModel):
    """Base model for payment."""
    ac_n: str
    bank: str
    ifsc: str
    gstin:str
    ac_type:str
    pmt_method:str
    pmt_status:str

class BusinessDetails(BaseModel):
    """Base model for business details."""
    business_type: str
    industry: str
    years_in_business: int
    number_of_employees: int
    pan_number: str
    udyam_registration: str
    tax_info: str

class VendorPerformanceBase(BaseModel):
    """Base model for vendor performance."""
    rating: float
    number_of_sales: int
    feedback_score: float
    response_time: int
    order_fulfillment_rate: int
    
class VendorsProductsBase(BaseModel):
    """Base model for vendors products."""
    total_products_listed: int
    products_in_stock: int
    pending_approval_products: int
    products_ids: List[str]

class VendorsShippingBase(BaseModel):
    """Base model for vendors shipping."""
    shipping_methods: List[str]
    supported_regions: List[str]
    average_delivery_time: str
    handling_fee: int
    
class VendorsTaxBase(BaseModel):
    """Base model for vendors tax."""
    gst_rate: int
    region_tax_compliance: str
    state_specific_tax: dict[str,int]

class VendorsBase(BaseModel):
    """Base model for vendors."""
    vendor_name: str    
    address: AddressBase
    payment_details: PaymentBase
    business_details: BusinessDetails
    performance: VendorPerformanceBase
    products: VendorsProductsBase
    support_tickets: List[str]
    messages: List[str]
    audit_log: List[str]
    shipping_info: VendorsShippingBase
    tax_info:VendorsTaxBase