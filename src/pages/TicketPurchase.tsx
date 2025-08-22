import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, CheckCircle, User, Mail, Phone } from 'lucide-react';
import Layout from '../components/Layout';
import { getEventById, Event } from '../data/events';
import { useToast } from '../hooks/use-toast';

const TicketPurchase = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    if (id) {
      const foundEvent = getEventById(id);
      if (foundEvent) {
        setEvent(foundEvent);
        // Get data from navigation state if available
        if (location.state) {
          const { quantity: stateQuantity, totalPrice: stateTotalPrice } = location.state as any;
          setQuantity(stateQuantity || 1);
          setTotalPrice(stateTotalPrice || foundEvent.price);
        } else {
          setTotalPrice(foundEvent.price);
        }
      } else {
        navigate('/404');
      }
    }
  }, [id, location.state, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (event && newQuantity >= 1 && newQuantity <= event.availableTickets) {
      setQuantity(newQuantity);
      setTotalPrice(event.price * newQuantity);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (formData.paymentMethod === 'credit' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast({
        title: "Payment Information Required",
        description: "Please complete your payment details.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Purchase Successful!",
        description: "Your tickets have been booked. Check your email for confirmation.",
      });
      
      // Redirect to success page or home
      navigate('/', { 
        state: { 
          purchaseSuccess: true,
          eventTitle: event?.title,
          ticketCount: quantity
        }
      });
    }, 3000);
  };

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading purchase details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  const serviceFee = totalPrice * 0.05; // 5% service fee
  const finalTotal = totalPrice + serviceFee;

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Event Details
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Purchase Form */}
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Purchase</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <User className="h-5 w-5 text-primary mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="search-bar w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="search-bar w-full"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="search-bar w-full"
                      required
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="search-bar w-full"
                    />
                  </div>
                </div>

                {/* Ticket Quantity */}
                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Ticket Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold min-w-[3rem] text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= event.availableTickets}
                      className="w-10 h-10 rounded-lg bg-muted hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="gradient-card rounded-xl p-6 border border-border/20">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                    <CreditCard className="h-5 w-5 text-primary mr-2" />
                    Payment Information
                  </h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Payment Method
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="search-bar w-full"
                    >
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>

                  {formData.paymentMethod === 'credit' && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="search-bar w-full"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="search-bar w-full"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="search-bar w-full"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="search-bar w-full"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-primary flex items-center justify-center py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground mr-2"></div>
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Complete Purchase - ${finalTotal.toFixed(2)}
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  Your payment information is encrypted and secure
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="animate-fade-in">
              <div className="sticky top-24">
                <div className="gradient-card rounded-xl p-6 border border-border/20 shadow-card">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Order Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Event</span>
                      <span className="font-medium text-right max-w-[200px] text-foreground">
                        {event.title}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span className="font-medium text-foreground">
                        {new Date(`${event.date}T${event.time}`).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Venue</span>
                      <span className="font-medium text-right max-w-[200px] text-foreground">
                        {event.venue}
                      </span>
                    </div>
                    
                    <hr className="border-border/20" />
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {quantity} Ticket{quantity > 1 ? 's' : ''} × ${event.price}
                      </span>
                      <span className="font-medium text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium text-foreground">
                        ${serviceFee.toFixed(2)}
                      </span>
                    </div>
                    
                    <hr className="border-border/20" />
                    
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-foreground">Total</span>
                      <span className="font-bold text-primary">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-success mb-1">Free Cancellation</p>
                        <p className="text-muted-foreground">
                          Cancel up to 24 hours before the event for a full refund
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketPurchase;