import { render, waitFor } from "@lib/test/testing-library";
import { ScannedProductHandler } from "./ScannedProductHandler";
import { __seedInMemory } from "@features/core/data-access/repository/in-memory.data";

jest.mock("@features/core/data-access/repository");

describe("ScannedProductHandler", () => {
  const resetBarcodeMock = jest.fn();
  __seedInMemory();

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
    await waitFor(async () => {
      const dialog = await findByTestId("dialog");
      expect(dialog).toBeOnTheScreen();
    });
  });

  it("should display ProductFoundContent when product is found", async () => {
    const { findByTestId } = render(
      <ScannedProductHandler barCode="1234" resetBarcode={resetBarcodeMock} />
    );
    await waitFor(
      async () => {
        const productFoundContent = await findByTestId("product-found-content");
        expect(productFoundContent).toBeOnTheScreen();
      },
      { timeout: 5000 }
    );
  });

  it("should display ProductNotFoundContent when product is not found", async () => {
    const { findByTestId } = render(
      <ScannedProductHandler barCode="0" resetBarcode={resetBarcodeMock} />
    );

    await waitFor(async () => {
      const productNotFoundContent = await findByTestId(
        "product-not-found-content"
      );
      expect(productNotFoundContent).toBeOnTheScreen();
    });
  });
});
