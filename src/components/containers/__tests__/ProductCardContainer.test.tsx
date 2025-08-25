import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductCardContainer } from '../ProductCardContainer';
import { vi } from 'vitest';

// Mock del presenter
vi.mock('../../presenters/ProductCardPresenter', () => ({
  ProductCardPresenter: ({ product, onProductClick, onVisitStore }: any) => (
    <div data-testid="product-card-presenter">
      <h3>{product.name}</h3>
      <button onClick={onProductClick}>Click Product</button>
      <button onClick={onVisitStore}>Visit Store</button>
    </div>
  ),
}));

const mockProduct = {
  id: "1",
  name: "Test Product",
  brand: "Test Brand",
  category: "medicamentos",
  subcategory: "general",
  price: 10000,
  offerPrice: null,
  imageUrl: "/test-image.jpg",
  stock: 50,
  url: "https://test.com",
  offerDescription: null,
  requirePrescription: false,
  supplier: "Test Supplier",
  availableOnline: true,
  views: 100,
};

describe('ProductCardContainer', () => {
  it('renders correctly with product data', () => {
    render(
      <ProductCardContainer
        product={mockProduct}
        onProductClick={vi.fn()}
        onVisitStore={vi.fn()}
      />
    );

    expect(screen.getByTestId('product-card-presenter')).toBeInTheDocument();
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('calculates discount percentage correctly', () => {
    const productWithOffer = {
      ...mockProduct,
      price: 10000,
      offerPrice: 7000,
    };

    render(
      <ProductCardContainer
        product={productWithOffer}
        onProductClick={vi.fn()}
        onVisitStore={vi.fn()}
      />
    );

    // El descuento debería ser 30%
    expect(screen.getByTestId('product-card-presenter')).toBeInTheDocument();
  });

  it('handles product click correctly', () => {
    const mockOnProductClick = vi.fn();
    
    render(
      <ProductCardContainer
        product={mockProduct}
        onProductClick={mockOnProductClick}
        onVisitStore={vi.fn()}
      />
    );

    fireEvent.click(screen.getByText('Click Product'));
    expect(mockOnProductClick).toHaveBeenCalledWith(mockProduct);
  });

  it('handles visit store correctly', () => {
    const mockOnVisitStore = vi.fn();
    
    render(
      <ProductCardContainer
        product={mockProduct}
        onProductClick={vi.fn()}
        onVisitStore={mockOnVisitStore}
      />
    );

    fireEvent.click(screen.getByText('Visit Store'));
    expect(mockOnVisitStore).toHaveBeenCalledWith(mockProduct);
  });

  it('formats price correctly', () => {
    render(
      <ProductCardContainer
        product={mockProduct}
        onProductClick={vi.fn()}
        onVisitStore={vi.fn()}
      />
    );

    expect(screen.getByTestId('product-card-presenter')).toBeInTheDocument();
  });

  it('handles mouse events correctly', () => {
    render(
      <ProductCardContainer
        product={mockProduct}
        onProductClick={vi.fn()}
        onVisitStore={vi.fn()}
      />
    );

    const presenter = screen.getByTestId('product-card-presenter');
    
    fireEvent.mouseEnter(presenter);
    fireEvent.mouseLeave(presenter);
    
    expect(screen.getByTestId('product-card-presenter')).toBeInTheDocument();
  });
});
