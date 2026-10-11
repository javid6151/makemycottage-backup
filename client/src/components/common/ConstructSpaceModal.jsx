import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX, HiCheck, HiOutlineSparkles, HiOutlineLightBulb } from 'react-icons/hi';
import { FaShuffle } from 'react-icons/fa6';

const COLS = 5;
const ROWS = 3;
const TOTAL_TILES = COLS * ROWS; // 15 modules

// Architectural image matching the Bildora timber cottage & pool deck vibe
const PUZZLE_IMAGE = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80';

// Fisher-Yates shuffle
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const ConstructSpaceModal = ({ isOpen, onClose, onRewardClaimed }) => {
  // Tile data definitions
  const allTiles = useMemo(() => {
    const tiles = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const id = r * COLS + c;
        const xPercent = (c / (COLS - 1)) * 100;
        const yPercent = (r / (ROWS - 1)) * 100;
        tiles.push({
          id,
          row: r,
          col: c,
          bgPos: `${xPercent}% ${yPercent}%`
        });
      }
    }
    return tiles;
  }, []);

  // Board states
  const [boardSlots, setBoardSlots] = useState(() => Array(TOTAL_TILES).fill(null));
  const [availablePieces, setAvailablePieces] = useState([]);
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const [draggedPieceId, setDraggedPieceId] = useState(null);
  const [dragOverSlotIndex, setDragOverSlotIndex] = useState(null);
  const [wrongSlotIndex, setWrongSlotIndex] = useState(null);
  const [successSlotIndex, setSuccessSlotIndex] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Initialize and thoroughly shuffle
  const initializeGame = useCallback(() => {
    setBoardSlots(Array(TOTAL_TILES).fill(null));
    setSelectedPieceId(null);
    setDraggedPieceId(null);
    setDragOverSlotIndex(null);
    setWrongSlotIndex(null);
    setSuccessSlotIndex(null);
    setIsCompleted(false);
    setCopiedCode(false);

    // Truly randomized order
    setAvailablePieces(shuffleArray(allTiles));
  }, [allTiles]);

  useEffect(() => {
    if (isOpen) {
      initializeGame();
    }
  }, [isOpen, initializeGame]);

  // Check completion
  useEffect(() => {
    const placedCount = boardSlots.filter(Boolean).length;
    if (placedCount === TOTAL_TILES) {
      setIsCompleted(true);
    }
  }, [boardSlots]);

  // Place attempt logic (Drag-and-Drop or Click-to-place)
  const handlePlaceAttempt = (pieceId, slotIndex) => {
    if (boardSlots[slotIndex]) return; // slot already taken
    const piece = availablePieces.find((p) => p.id === pieceId);
    if (!piece) return;

    // Strict validation: Only fits into its exact correct position!
    if (piece.id === slotIndex) {
      // Correct position!
      setBoardSlots((prev) => {
        const next = [...prev];
        next[slotIndex] = piece;
        return next;
      });
      setAvailablePieces((prev) => prev.filter((p) => p.id !== piece.id));
      setSelectedPieceId(null);
      setSuccessSlotIndex(slotIndex);
      setTimeout(() => setSuccessSlotIndex(null), 600);
    } else {
      // Wrong position!
      // Piece CANNOT fit here. It bounces back to the right side.
      setWrongSlotIndex(slotIndex);
      setSelectedPieceId(null);
      setTimeout(() => setWrongSlotIndex(null), 650);
    }
  };

  // Click-to-select on available piece
  const handleSelectPiece = (piece) => {
    if (selectedPieceId === piece.id) {
      setSelectedPieceId(null);
    } else {
      setSelectedPieceId(piece.id);
    }
  };

  // Click on target slot
  const handleSlotClick = (slotIndex) => {
    if (selectedPieceId !== null) {
      handlePlaceAttempt(selectedPieceId, slotIndex);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, piece) => {
    e.dataTransfer.setData('text/plain', piece.id.toString());
    e.dataTransfer.effectAllowed = 'move';
    setDraggedPieceId(piece.id);
  };

  const handleDragEnd = () => {
    setDraggedPieceId(null);
    setDragOverSlotIndex(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, slotIndex) => {
    e.preventDefault();
    if (!boardSlots[slotIndex]) {
      setDragOverSlotIndex(slotIndex);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOverSlotIndex(null);
  };

  const handleDrop = (e, slotIndex) => {
    e.preventDefault();
    setDragOverSlotIndex(null);
    const pieceIdStr = e.dataTransfer.getData('text/plain');
    const pieceId = parseInt(pieceIdStr, 10);
    if (!isNaN(pieceId)) {
      handlePlaceAttempt(pieceId, slotIndex);
    }
  };

  // Shuffle remaining available pieces
  const handleShuffle = () => {
    setAvailablePieces((prev) => shuffleArray(prev));
    setSelectedPieceId(null);
  };

  // Hint: Finds the first remaining piece and places it in its correct position
  const handleHint = () => {
    if (availablePieces.length === 0) return;
    const nextPiece = availablePieces[0];
    handlePlaceAttempt(nextPiece.id, nextPiece.id);
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('COTTAGEVIP10');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleClaim = () => {
    if (onRewardClaimed) {
      onRewardClaimed('COTTAGEVIP10');
    }
    onClose();
  };

  const remaining = availablePieces.length;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-[#FAF7F0] rounded-3xl sm:rounded-[36px] shadow-2xl overflow-hidden p-6 sm:p-10 border border-stone-200 z-10 my-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-700 hover:text-black flex items-center justify-center transition-colors z-20"
              aria-label="Close modal"
            >
              <HiX className="w-5 h-5" />
            </button>

            {/* Subtle Bildora accent lines */}
            <div className="absolute top-1/2 left-0 w-8 h-[1px] bg-stone-300 hidden md:block" />
            <div className="absolute top-1/2 right-0 w-8 h-[1px] bg-stone-300 hidden md:block" />

            {!isCompleted ? (
              <>
                {/* Header */}
                <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
                  <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#141517] tracking-tight">
                    Construct your space
                  </h3>
                  <p className="text-stone-600 text-sm sm:text-base font-normal mt-1.5">
                    and receive an exclusive reward.
                  </p>
                </div>

                {/* 2-Column Game Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center max-w-3xl mx-auto">
                  
                  {/* Left: Target Canvas (5x3 Grid) - Seamless Zero-Gap Photo Construction */}
                  <div className="bg-[#EFECE3]/80 p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-stone-300/80 shadow-inner">
                    <div className="grid grid-cols-5 gap-0 aspect-[5/3] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-200/50">
                      {boardSlots.map((piece, idx) => {
                        const isOver = dragOverSlotIndex === idx;
                        const isWrong = wrongSlotIndex === idx;
                        const isSuccess = successSlotIndex === idx;

                        return (
                          <div
                            key={`slot-${idx}`}
                            onClick={() => handleSlotClick(idx)}
                            onDragOver={handleDragOver}
                            onDragEnter={(e) => handleDragEnter(e, idx)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, idx)}
                            className={`aspect-square relative transition-all duration-150 flex items-center justify-center ${
                              piece
                                ? 'bg-transparent'
                                : `border border-dashed border-stone-300/70 bg-stone-100/60 hover:bg-stone-200/60 cursor-pointer ${
                                    isOver
                                      ? 'border-2 border-[#e84416] bg-orange-100/70 z-10'
                                      : ''
                                  }`
                            } ${
                              isWrong
                                ? 'ring-2 ring-red-500 bg-red-100/70 z-20 animate-bounce'
                                : ''
                            } ${
                              isSuccess
                                ? 'ring-2 ring-emerald-500 z-20'
                                : ''
                            }`}
                          >
                            {piece ? (
                              <div
                                className="w-full h-full pointer-events-none"
                                style={{
                                  backgroundImage: `url(${PUZZLE_IMAGE})`,
                                  backgroundSize: '500% 300%',
                                  backgroundPosition: piece.bgPos
                                }}
                              />
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Available Modules (Rendered in Scrambled/Random Order) */}
                  <div className="bg-transparent">
                    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 aspect-[5/3]">
                      {Array.from({ length: TOTAL_TILES }).map((_, idx) => {
                        const piece = availablePieces[idx];

                        if (!piece) {
                          // Empty slot placeholder once piece is placed
                          return (
                            <div
                              key={`empty-pool-${idx}`}
                              className="aspect-square rounded-lg sm:rounded-xl bg-stone-200/20 border border-stone-200/30"
                            />
                          );
                        }

                        const isSelected = selectedPieceId === piece.id;
                        const isBeingDragged = draggedPieceId === piece.id;

                        return (
                          <div
                            key={`piece-scrambled-${piece.id}`}
                            draggable={true}
                            onDragStart={(e) => handleDragStart(e, piece)}
                            onDragEnd={handleDragEnd}
                            onClick={() => handleSelectPiece(piece)}
                            title="Drag and drop onto target board (or click to select)"
                            className={`aspect-square rounded-lg sm:rounded-xl overflow-hidden cursor-grab active:cursor-grabbing shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 relative select-none ${
                              isBeingDragged ? 'opacity-40 scale-95' : 'opacity-100'
                            } ${
                              isSelected
                                ? 'ring-2 ring-[#e84416] ring-offset-2 scale-105 shadow-md z-10'
                                : 'hover:shadow-md'
                            }`}
                          >
                            <div
                              className="w-full h-full rounded-lg sm:rounded-xl pointer-events-none"
                              style={{
                                backgroundImage: `url(${PUZZLE_IMAGE})`,
                                backgroundSize: '500% 300%',
                                backgroundPosition: piece.bgPos
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Controls Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 sm:pt-8 mt-2 max-w-3xl mx-auto border-t border-stone-200/70 text-xs">
                  <div className="text-stone-500 font-semibold uppercase tracking-[0.16em]">
                    MODULES ({remaining} REMAINING)
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleHint}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EFECE3] border border-stone-300 text-stone-800 font-medium hover:bg-stone-300 transition-colors shadow-sm"
                    >
                      <HiOutlineLightBulb className="text-amber-500 w-4 h-4" />
                      <span>Hint</span>
                    </button>

                    <button
                      onClick={handleShuffle}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-stone-600 hover:text-stone-900 transition-colors font-medium"
                    >
                      <span>Shuffle</span>
                      <FaShuffle className="w-3 h-3 text-stone-500" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Reward Unlocked Screen */
              <div className="text-center py-6 sm:py-8 max-w-lg mx-auto space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <HiOutlineSparkles className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs uppercase tracking-widest font-semibold">
                    Space Constructed
                  </span>
                  <h3 className="font-heading text-3xl sm:text-4xl font-black text-[#141517]">
                    Here is your exclusive reward
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    You have unlocked an exclusive <strong>10% VIP Consultation Privilege</strong> for your turnkey wooden cottage or prefabricated resort home.
                  </p>
                </div>

                {/* Voucher Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-center justify-between gap-3 max-w-sm mx-auto">
                  <div className="text-left">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-medium">
                      Promo Code
                    </span>
                    <span className="font-mono text-lg font-bold text-[#e84416] tracking-wider">
                      COTTAGEVIP10
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    {copiedCode ? (
                      <>
                        <HiCheck className="w-4 h-4 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <span>Copy</span>
                    )}
                  </button>
                </div>

                {/* CTA Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleClaim}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#141517] hover:bg-black text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md"
                  >
                    Claim Discount with Project Enquiry &rarr;
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConstructSpaceModal;
