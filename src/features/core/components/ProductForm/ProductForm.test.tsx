import {
  Providers,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from "@lib/test/testing-library";
import { ProductForm } from "./ProductForm";
import { useProductForm } from "./hooks/useProductForm";
import {
  __seedInMemory,
  __setProducts,
} from "@features/core/data-access/repository/in-memory.data";

jest.mock("../../data-access/repository");

describe("ProductForm", () => {
  it("should render category details after selecting the category when product is not present", async () => {
    __seedInMemory();
    __setProducts([]);

    const { result } = renderHook(() => useProductForm({ barCode: "1234" }), {
      wrapper: Providers,
    });

    await waitFor(() => {
      result.current.form;
    });

    const { getByTestId, getByText, rerender } = render(
      <ProductForm form={result.current.form} />
    );

    await waitFor(async () => {
      const categorySelect = await getByTestId("category-select");
      fireEvent.press(categorySelect);
    });

    await waitFor(async () => {
      const categoryLabel = await getByText("cat.2");
      fireEvent.press(categoryLabel);
    });

    rerender(<ProductForm form={result.current.form} />);

    await waitFor(async () => {
      const categoryLabel = await getByText("cat.det.3.label");
      expect(categoryLabel).toBeOnTheScreen();
    });
  }, 10000);

  it("should populate the form with the product data if it is already present", async () => {
    __seedInMemory();

    const { result } = renderHook(() => useProductForm({ barCode: "1234" }), {
      wrapper: Providers,
    });

    await waitFor(() => {
      result.current.form;
    });

    const { getByDisplayValue } = render(
      <ProductForm form={result.current.form} />
    );

    await waitFor(() =>
      expect(getByDisplayValue("cat.det.1.val")).toBeOnTheScreen()
    );
  });

  it("should reset details data if category cahnges", async () => {
    __seedInMemory();

    const { result } = renderHook(() => useProductForm({ barCode: "1234" }), {
      wrapper: Providers,
    });

    await waitFor(() => {
      result.current.form;
    });

    const { getByTestId, getByText, getByDisplayValue, rerender } = render(
      <ProductForm form={result.current.form} />
    );

    await waitFor(() => fireEvent.press(getByTestId("category-select")));

    await waitFor(() => fireEvent.press(getByText("cat.2")));

    rerender(<ProductForm form={result.current.form} />);
    await waitFor(() => {
      expect(getByDisplayValue("brand.1")).toBeOnTheScreen();
      expect(getByText("cat.det.3.label")).toBeOnTheScreen();
    });
  });
});
