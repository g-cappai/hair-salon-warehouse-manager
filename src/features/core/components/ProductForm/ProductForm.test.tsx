import {
  Providers,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@lib/test/testing-library";
import { ProductForm } from "./ProductForm";
import { useProductForm } from "./hooks/useProductForm";

jest.mock("@features/core/data-access/service/BrandService");
jest.mock("@features/core/data-access/service/CategoryService");

describe("ProductForm", () => {
  it("should render category details after selecting the category", async () => {
    const { result } = renderHook(() => useProductForm({ barCode: "1234" }), {
      wrapper: Providers,
    });

    await waitFor(() => {
      result.current.form;
    });

    const { getByTestId, getByText, rerender } = render(
      <ProductForm form={result.current.form} />
    );

    await waitFor(() => fireEvent.press(getByTestId("category-select")));

    await waitFor(() => fireEvent.press(getByText("Category 2")));

    rerender(<ProductForm form={result.current.form} />);

    expect(getByText("Category 2 Name")).toBeOnTheScreen();
  });
});
