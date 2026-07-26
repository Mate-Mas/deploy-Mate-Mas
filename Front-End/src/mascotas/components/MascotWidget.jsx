import { getMascotConfig } from '../registry';
import { useMascotContext } from '../core/MascotProvider';
import { MascotCharacter } from './MascotCharacter';
import { SpeechBubble } from './SpeechBubble';
import './MascotWidget.css';

/**
 * Widget completo: mascota animada + burbuja de diálogo.
 * Colocalo donde quieras en tu app React.
 */
export function MascotWidget({
  size = 160,
  position = 'bottom-right',
  showBubble = true,
  className = '',
}) {
  const { mascotId, state, currentMessage, isSpeaking, dismissMessage } = useMascotContext();
  const config = getMascotConfig(mascotId);

  const positionClass = position !== 'inline' ? `mascot-widget--${position}` : '';

  return (
    <div className={`mascot-widget ${positionClass} ${className}`}>
      {showBubble && isSpeaking && currentMessage && (
        <SpeechBubble
          message={currentMessage}
          mascotName={config.personality.name}
          onDismiss={dismissMessage}
          position={position === 'bottom-left' ? 'left' : 'top'}
        />
      )}
      <MascotCharacter mascotId={mascotId} state={state} size={size} />
    </div>
  );
}
