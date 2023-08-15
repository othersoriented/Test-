import AVFoundation

class SoundManager {
    
    static let shared = SoundManager()
    
    var soundPlayer: AVAudioPlayer?
    var soundArray: [SoundModel] = []
    
    private init() {
        loadSounds()
    }
    
    private func loadSounds() {
        let soundNames = ["sound1", "sound2", "sound3"]
        let imageNames = ["image1", "image2", "image3"]
        
        for (index, soundName) in soundNames.enumerated() {
            let sound = SoundModel(soundFileName: soundName, imageName: imageNames[index])
            soundArray.append(sound)
        }
    }
    
    func playSound(sound: SoundModel) {
        let url = Bundle.main.url(forResource: sound.soundFileName, withExtension: "mp3")
        
        do {
            soundPlayer = try AVAudioPlayer(contentsOf: url!)
            soundPlayer?.play()
        } catch {
            print("Error: Could not play sound: \(sound.soundFileName)")
        }
    }
}