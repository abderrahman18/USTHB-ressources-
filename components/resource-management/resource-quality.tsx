"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  Eye,
  Download,
  Flag,
  Shield,
  Zap,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react"

interface QualityMetrics {
  overallScore: number
  contentQuality: number
  userRating: number
  downloadCount: number
  viewCount: number
  reportCount: number
  verificationStatus: "verified" | "pending" | "flagged"
  duplicateStatus: "unique" | "similar" | "duplicate"
  aiTags: string[]
  qualityBadges: string[]
}

interface ResourceVersion {
  version: string
  uploadDate: Date
  changes: string[]
  uploader: string
  size: string
}

const mockQualityData: QualityMetrics = {
  overallScore: 87,
  contentQuality: 92,
  userRating: 4.6,
  downloadCount: 1250,
  viewCount: 3420,
  reportCount: 2,
  verificationStatus: "verified",
  duplicateStatus: "unique",
  aiTags: ["Algorithmique", "Structures de données", "Complexité", "Exemples pratiques", "Exercices corrigés"],
  qualityBadges: ["Contenu vérifié", "Haute qualité", "Populaire", "Recommandé"],
}

const mockVersions: ResourceVersion[] = [
  {
    version: "v2.1",
    uploadDate: new Date("2024-01-15"),
    changes: ["Correction des erreurs de frappe", "Ajout d'exemples supplémentaires"],
    uploader: "Dr. Ahmed Benali",
    size: "2.4 MB",
  },
  {
    version: "v2.0",
    uploadDate: new Date("2024-01-10"),
    changes: ["Restructuration complète", "Nouveaux exercices", "Amélioration des diagrammes"],
    uploader: "Dr. Ahmed Benali",
    size: "2.2 MB",
  },
  {
    version: "v1.5",
    uploadDate: new Date("2023-12-20"),
    changes: ["Correction des solutions", "Mise à jour des références"],
    uploader: "Dr. Ahmed Benali",
    size: "2.0 MB",
  },
]

export function ResourceQuality({ resourceId }: { resourceId: string }) {
  const [qualityData, setQualityData] = useState<QualityMetrics>(mockQualityData)
  const [versions, setVersions] = useState<ResourceVersion[]>(mockVersions)
  const [showAllVersions, setShowAllVersions] = useState(false)

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getDuplicateIcon = (status: string) => {
    switch (status) {
      case "unique":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "similar":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "duplicate":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <XCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Quality Score */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Score de Qualité Global
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(qualityData.overallScore)}`}>
                {qualityData.overallScore}
              </div>
              <div className="text-sm text-muted-foreground">Score Global</div>
            </div>
            <div className="flex-1 mx-8">
              <Progress value={qualityData.overallScore} className="h-3" />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{qualityData.userRating}</span>
              </div>
              <div className="text-sm text-muted-foreground">Note utilisateurs</div>
            </div>
          </div>

          {/* Quality Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {qualityData.qualityBadges.map((badge, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="animate-scaleIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {badge}
              </Badge>
            ))}
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Eye className="h-5 w-5 mx-auto mb-1 text-blue-500" />
              <div className="font-semibold">{qualityData.viewCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Vues</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Download className="h-5 w-5 mx-auto mb-1 text-green-500" />
              <div className="font-semibold">{qualityData.downloadCount.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Téléchargements</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-500" />
              <div className="font-semibold">{qualityData.contentQuality}%</div>
              <div className="text-xs text-muted-foreground">Qualité contenu</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <Flag className="h-5 w-5 mx-auto mb-1 text-red-500" />
              <div className="font-semibold">{qualityData.reportCount}</div>
              <div className="text-xs text-muted-foreground">Signalements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Status */}
        <Card className="animate-fadeInLeft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Statut de Vérification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {getVerificationIcon(qualityData.verificationStatus)}
                <span className="font-medium">Vérification du contenu</span>
              </div>
              <Badge variant={qualityData.verificationStatus === "verified" ? "default" : "secondary"}>
                {qualityData.verificationStatus === "verified" ? "Vérifié" : "En attente"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                {getDuplicateIcon(qualityData.duplicateStatus)}
                <span className="font-medium">Détection de doublons</span>
              </div>
              <Badge variant={qualityData.duplicateStatus === "unique" ? "default" : "secondary"}>
                {qualityData.duplicateStatus === "unique" ? "Unique" : "Similaire"}
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Modération communautaire</span>
              </div>
              <Badge variant="default">Actif</Badge>
            </div>
          </CardContent>
        </Card>

        {/* AI Tags */}
        <Card className="animate-fadeInRight">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Tags IA Automatiques
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Tags générés automatiquement par analyse du contenu:</p>
              <div className="flex flex-wrap gap-2">
                {qualityData.aiTags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="animate-scaleIn hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-3">
                <Zap className="h-4 w-4 mr-2" />
                Régénérer les tags
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Version History */}
      <Card className="animate-fadeInUp">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Historique des Versions
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowAllVersions(!showAllVersions)}>
              {showAllVersions ? "Masquer" : "Voir tout"}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(showAllVersions ? versions : versions.slice(0, 2)).map((version, index) => (
              <div key={version.version} className={`p-4 border rounded-lg animate-fadeInUp stagger-${index + 1}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{version.version}</Badge>
                    {index === 0 && <Badge variant="secondary">Actuelle</Badge>}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {version.uploadDate.toLocaleDateString()} • {version.size}
                  </div>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium">Par: {version.uploader}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">Modifications:</div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {version.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">
                    Télécharger cette version
                  </Button>
                  <Button variant="ghost" size="sm">
                    Comparer
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
