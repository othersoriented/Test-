import UIKit
import AVFoundation

class ViewController: UIViewController {

    @IBOutlet weak var pictureButton: UIButton!
    var soundManager = SoundManager()
    var soundArray: [SoundModel] = []

    override func viewDidLoad() {
        super.viewDidLoad()
        loadSounds()
    }

    func loadSounds() {
        let sound1 = SoundModel(soundFileName: "sound1", imageName: "image1")
        let sound2 = SoundModel(soundFileName: "sound2", imageName: "image2")
        let sound3 = SoundModel(soundFileName: "sound3", imageName: "image3")
        soundArray = [sound1, sound2, sound3]
    }

    @IBAction func pictureTapped(_ sender: UIButton) {
        let sound = soundArray[sender.tag]
        soundManager.playSound(soundFileName: sound.soundFileName)
    }
}