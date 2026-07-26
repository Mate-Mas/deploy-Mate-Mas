import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

export default function DragConstraints() {
  const constraintsRef = useRef(null);
  const [resetKey, setResetKey] = useState(0);
  const [items, setItems] = useState([
    { id: 1, label: "$1000", color: "#ff6b6b", dropped: false },
    { id: 2, label: "$1200", color: "#ff9f43", dropped: false },
    { id: 3, label: "$200", color: "#feca57", dropped: false },
    { id: 4, label: "$2000", color: "#48dbfb", dropped: false },
  ]);

  const [droppedItems, setDroppedItems] = useState([]);
  
  // Estado para el bloc de notas
  const [notes, setNotes] = useState([
    { id: 1, text: "Recordatorio: Revisar precios", color: "#fff3cd" },
    { id: 2, text: "Oferta especial - 20% descuento", color: "#d1ecf1" },
  ]);
  const [editingNote, setEditingNote] = useState(null);
  const [newNoteText, setNewNoteText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = (itemId) => {
    const item = items.find(i => i.id === itemId);
    if (item && !item.dropped) {
      setItems(prev =>
        prev.map(i =>
          i.id === itemId ? { ...i, dropped: true } : i
        )
      );
      setDroppedItems(prev => [...prev, item.label]);
    }
  };

  const removeFromDrop = (labelToRemove) => {
    setDroppedItems(prev => prev.filter(label => label !== labelToRemove));
    setItems(prev =>
      prev.map(i =>
        i.label === labelToRemove ? { ...i, dropped: false } : i
      )
    );
  };

  const resetQuiz = () => {
    setItems(prev =>
      prev.map(i => ({ ...i, dropped: false }))
    );
    setDroppedItems([]);
    setResetKey(prev => prev + 1);
  };

  // Funciones para el bloc de notas
  const addNote = () => {
    if (newNoteText.trim()) {
      const colors = ["#fff3cd", "#d1ecf1", "#d4edda", "#f8d7da", "#e2d4f0", "#ffe5d9"];
      setNotes(prev => [...prev, {
        id: Date.now(),
        text: newNoteText,
        color: colors[Math.floor(Math.random() * colors.length)],
      }]);
      setNewNoteText("");
    }
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateNote = (id, newText) => {
    if (newText.trim()) {
      setNotes(prev =>
        prev.map(note =>
          note.id === id ? { ...note, text: newText } : note
        )
      );
    }
    setEditingNote(null);
  };

  return (
    <div style={styles.container}>
      <motion.button
        style={{ ...styles.resetButton, position: 'fixed', top: '20px', right: '20px', zIndex: 999 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetQuiz}
      >
        🔄 Reiniciar
      </motion.button>

      {/* Botón para abrir el bloc de notas */}
      <motion.button
        style={{ ...styles.openNotesButton, position: 'fixed', top: '80px', right: '20px', zIndex: 999 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
      >
        📝 Bloc de Notas ({notes.length})
      </motion.button>

      <h1 style={styles.title}>💰 Arrastra los precios correctos</h1>

      <div style={styles.mainContainer}>
        <div style={styles.optionsGrid}>
          {items.map((item) => (
            !item.dropped && (
              <motion.div
                key={`${item.id}-${resetKey}`}
                drag
                dragConstraints={constraintsRef}
                dragElastic={0}
                dragMomentum={true}
                style={{
                  ...styles.option,
                  backgroundColor: item.color,
                  borderColor: item.color,
                  opacity: item.dropped ? 0.3 : 1,
                  cursor: item.dropped ? 'default' : 'grab',
                }}
                whileHover={!item.dropped ? {
                  scale: 1.05,
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                } : {}}
                whileTap={!item.dropped ? { scale: 0.95 } : {}}
                onDragEnd={(event, info) => {
                  const dropZone = document.querySelector('.drop-zone');
                  if (dropZone) {
                    const rect = dropZone.getBoundingClientRect();
                    const point = {
                      x: info.point.x,
                      y: info.point.y
                    };

                    if (point.x >= rect.left && point.x <= rect.right &&
                      point.y >= rect.top && point.y <= rect.bottom) {
                      handleDrop(item.id);
                    }
                  }
                }}
                layout
              >
                {item.label}
              </motion.div>
            )
          ))}
        </div>

        <motion.div
          ref={constraintsRef}
          className="drop-zone"
          style={{
            ...styles.dropZone,
            borderColor: droppedItems.length > 0 ? '#4CAF50' : '#2196F3',
            backgroundColor: droppedItems.length > 0 ? '#e8f5e9' : '#e3f2fd',
          }}
        >
          {droppedItems.length > 0 ? (
            <div style={styles.droppedItemsContainer}>
              <AnimatePresence>
                {droppedItems.map((label, index) => (
                  <motion.div
                    key={`${label}-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    style={{
                      ...styles.droppedItem,
                      backgroundColor: items.find(i => i.label === label)?.color || '#2196F3',
                    }}
                    onClick={() => removeFromDrop(label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Click para eliminar"
                  >
                    {label}
                    <span style={styles.removeIcon}>✕</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <span style={styles.placeholder}>
              🎯 Arrastra acá
            </span>
          )}
        </motion.div>
      </div>

      {droppedItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={styles.counter}
        >
          📦 {droppedItems.length} opci{droppedItems.length > 1 ? 'ones' : 'ón'} seleccionada{droppedItems.length > 1 ? 's' : ''}
          {droppedItems.length === items.length && ' ✅ ¡Todas las opciones seleccionadas!'}
        </motion.div>
      )}

      {/* Modal del Bloc de Notas */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              style={styles.modalContainer}
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header del modal */}
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>📝 Bloc de Notas</h2>
                <motion.button
                  style={styles.modalCloseButton}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </motion.button>
              </div>

              {/* Área de notas */}
              <div style={styles.notesArea}>
                {notes.length === 0 ? (
                  <div style={styles.emptyNotes}>
                    <span style={styles.emptyIcon}>📭</span>
                    <p>No hay notas aún</p>
                    <p style={styles.emptySubtext}>Agrega una nota usando el campo de abajo</p>
                  </div>
                ) : (
                  <div style={styles.notesGrid}>
                    {notes.map((note) => (
                      <motion.div
                        key={note.id}
                        style={{
                          ...styles.noteCard,
                          backgroundColor: note.color,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.02, boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}
                      >
                        {editingNote === note.id ? (
                          <motion.textarea
                            style={styles.noteTextarea}
                            defaultValue={note.text}
                            autoFocus
                            onBlur={(e) => updateNote(note.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') setEditingNote(null);
                              if (e.key === 'Enter' && e.shiftKey) {
                                updateNote(note.id, e.target.value);
                              }
                            }}
                            initial={{ height: 60 }}
                            animate={{ height: 100 }}
                          />
                        ) : (
                          <>
                            <div style={styles.noteText}>
                              {note.text}
                            </div>
                            <div style={styles.noteActions}>
                              <motion.button
                                style={styles.noteEditButton}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setEditingNote(note.id)}
                              >
                                ✏️ Editar
                              </motion.button>
                              <motion.button
                                style={styles.noteDeleteButton}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => deleteNote(note.id)}
                              >
                                🗑️ Eliminar
                              </motion.button>
                            </div>
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Área para agregar nueva nota */}
              <div style={styles.addNoteArea}>
                <textarea
                  style={styles.addNoteInput}
                  placeholder="Escribe tu nota aquí..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      addNote();
                    }
                  }}
                />
                <motion.button
                  style={styles.addNoteButton}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addNote}
                  disabled={!newNoteText.trim()}
                >
                  ➕ Agregar Nota
                </motion.button>
              </div>

              {/* Footer del modal */}
              <div style={styles.modalFooter}>
                <span style={styles.noteCount}>
                  {notes.length} nota{notes.length !== 1 ? 's' : ''}
                </span>
                <span style={styles.modalHint}>
                  💡 Presiona Enter para agregar
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    width: "100vw",
    minHeight: "100vh",
    backgroundColor: '#f0f4f8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: 'relative',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '50px',
    fontSize: '2.2rem',
    fontWeight: 'bold',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '60px',
    width: '100%',
    maxWidth: '900px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    flex: 1,
    maxWidth: '400px',
  },
  option: {
    padding: '25px 20px',
    borderRadius: '12px',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    userSelect: 'none',
    border: 'none',
    transition: 'all 0.2s ease',
    cursor: 'grab',
    minWidth: '100px',
  },
  dropZone: {
    width: '350px',
    minHeight: '350px',
    maxHeight: '400px',
    backgroundColor: '#e3f2fd',
    border: '3px dashed #2196F3',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    flexShrink: 0,
    overflow: 'auto',
  },
  droppedItemsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  droppedItem: {
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  removeIcon: {
    fontSize: '0.9rem',
    opacity: 0.7,
    marginLeft: '4px',
  },
  placeholder: {
    color: '#666',
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  counter: {
    marginTop: '30px',
    padding: '12px 24px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    fontSize: '1.1rem',
    fontWeight: '500',
    color: '#2c3e50',
  },
  resetButton: {
    padding: '12px 30px',
    background: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
  },
  openNotesButton: {
    padding: '12px 24px',
    background: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(255, 152, 0, 0.3)',
  },
  // Estilos del modal
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: '20px',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 25px 80px rgba(0,0,0,0.3)',
    overflow: 'hidden',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    borderBottom: '1px solid #e9ecef',
    backgroundColor: '#f8f9fa',
  },
  modalTitle: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#2c3e50',
  },
  modalCloseButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#999',
    padding: '4px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  notesArea: {
    flex: 1,
    padding: '20px 30px',
    overflowY: 'auto',
    minHeight: '200px',
    maxHeight: '400px',
  },
  emptyNotes: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#999',
  },
  emptyIcon: {
    fontSize: '4rem',
    marginBottom: '10px',
  },
  emptySubtext: {
    fontSize: '0.9rem',
    opacity: 0.7,
  },
  notesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },
  noteCard: {
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'all 0.2s ease',
  },
  noteText: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#333',
    wordWrap: 'break-word',
    whiteSpace: 'pre-wrap',
    minHeight: '40px',
  },
  noteActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end',
    borderTop: '1px solid rgba(0,0,0,0.05)',
    paddingTop: '10px',
  },
  noteEditButton: {
    background: 'none',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#666',
    padding: '4px 10px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  noteDeleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '13px',
    cursor: 'pointer',
    color: '#e74c3c',
    padding: '4px 10px',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },
  noteTextarea: {
    width: '100%',
    padding: '8px',
    border: '2px solid #FF9800',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    backgroundColor: 'white',
  },
  addNoteArea: {
    padding: '20px 30px',
    borderTop: '1px solid #e9ecef',
    backgroundColor: '#f8f9fa',
  },
  addNoteInput: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '60px',
    marginBottom: '12px',
    transition: 'border-color 0.3s ease',
    ':focus': {
      borderColor: '#FF9800',
      outline: 'none',
    },
  },
  addNoteButton: {
    padding: '10px 24px',
    background: '#FF9800',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: '100%',
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 30px',
    borderTop: '1px solid #e9ecef',
    backgroundColor: '#f8f9fa',
    fontSize: '13px',
    color: '#999',
  },
  noteCount: {
    fontWeight: '500',
  },
  modalHint: {
    fontSize: '12px',
  },
};

// Estilos adicionales para el textarea focus (en el objeto styles no funciona :focus)
const style = document.createElement('style');
style.textContent = `
  textarea:focus {
    outline: none;
    border-color: #FF9800 !important;
    box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
  }
  textarea {
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
`;
document.head.appendChild(style);