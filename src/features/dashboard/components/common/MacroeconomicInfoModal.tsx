interface MacroeconomicInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MacroeconomicInfoModal = ({
  isOpen,
  onClose,
}: MacroeconomicInfoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">
          Economic Scenario Generator (ESG)
        </h2>

        <div className="text-sm text-gray-700 space-y-4 max-h-[60vh] overflow-y-auto">
          <p>
            <strong>ESG (Economic Scenario Generator)</strong> dalam konteks
            stress testing adalah metode untuk menghasilkan skenario ekonomi
            ekstrem namun konsisten yang digunakan untuk menguji ketahanan
            portofolio dan neraca keuangan terhadap guncangan makroekonomi.
          </p>

          <p>
            ESG memungkinkan stress test dilakukan secara forward-looking dengan
            mempertimbangkan keterkaitan antar variabel makro, kemungkinan
            terjadinya resesi, serta dampaknya terhadap kinerja aset, sehingga
            hasil stress testing tidak bergantung pada satu skenario deterministik
            saja.
          </p>

          <p>
            Pada metode ini, variabel makro disimulasikan secara dinamis (VAR) dan
            Monte Carlo, probabilitas resesi dimodelkan secara endogen, lalu
            dampaknya dipetakan ke aset dan risiko dengan volatilitas yang berbeda
            antara kondisi normal dan stres.
          </p>

          <p>
            Hasilnya adalah distribusi skenario baseline hingga stress yang
            konsisten secara statistik, yang dapat digunakan untuk menilai potensi
            kerugian, sensitivitas, dan ketahanan institusi keuangan di bawah
            kondisi ekonomi yang memburuk.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}

export default MacroeconomicInfoModal;