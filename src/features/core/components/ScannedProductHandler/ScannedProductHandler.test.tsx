import { render, waitFor } from "@lib/test/testing-library";
import { ScannedProductHandler } from "./ScannedProductHandler";

jest.mock("@features/core/data-access/service/ProductService");

describe("ScannedProductHandler", () => {
  const resetBarcodeMock = jest.fn();

  it("should render null if no barcode is provided", () => {
    const { toJSON } = render(
      <ScannedProductHandler barCode={""} resetBarcode={resetBarcodeMock} />
    );
    expect(toJSON()).toBeNull();
  });

  it("should open dialog when barcode is provided", async () => {
    const { findByTestId } = render(
      <ScannedProductHandler barCode="123456" resetBarcode={resetBarcodeMock} />
    );
    const dialog = await findByTestId("dialog");
    await waitFor(() => expect(dialog).toBeOnTheScreen());
  });

  it("should display ProductFoundContent when product is found", async () => {
    const { findByTestId } = render(
      <ScannedProductHandler
        barCode="111111111"
        resetBarcode={resetBarcodeMock}
      />
    );
    const productFoundContent = await findByTestId("product-found-content");
    await waitFor(() => expect(productFoundContent).toBeOnTheScreen());
  });

  it("should display ProductNotFoundContent when product is not found", async () => {
    const { findByTestId } = render(
      <ScannedProductHandler barCode="0" resetBarcode={resetBarcodeMock} />
    );
    const productNotFoundContent = await findByTestId(
      "product-not-found-content"
    );
    await waitFor(() => expect(productNotFoundContent).toBeOnTheScreen());
  });
});
