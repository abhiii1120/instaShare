const BrandMark = ({ compact = false }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-2xl border border-zinc-200 bg-white text-sm font-semibold tracking-tight text-zinc-950 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
        K
      </div>

      {!compact ? (
        <div>
          <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">
            Kingsta
          </p>
          <p className="text-xs text-zinc-500">Share moments, stay close.</p>
        </div>
      ) : (
        <p className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">
          Kingsta
        </p>
      )}
    </div>
  );
};

export default BrandMark;